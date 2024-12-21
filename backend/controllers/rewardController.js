const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });

const thresholds = [
  2500, 7500, 17500, 42500, 92500, 242500, 492500, 992500,
  1992500, 4492500, 9492500, 29492500, 79492500,
];
const rewardValues = [
  30, 60, 120, 300, 600, 2000, 5000, 15000, 35000, 50000, 75000, 100000, 125000,
];

// Fetch all users from the database
const fetchAllUsers = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, username, is_active, active_plan, refferal_code, reward_level, reffer_by, plan_id, reward, reward_start_date, reward_duration, reward_remaining_months FROM users`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        return reject(new Error("Error fetching users!"));
      }
      resolve(result);
    });
  });
};

// Build referral tree from user data
function buildReferralTree(users) {
  const userMap = new Map();
  const rootNodes = [];

  users.forEach((user) => {
    user.referrals = [];
    userMap.set(user.refferal_code, user);
  });

  users.forEach((user) => {
    const parent = userMap.get(user.reffer_by);
    if (parent) {
      parent.referrals.push(user);
    }
  });

  users.forEach((user) => {
    if (user.referrals.length > 0 && !userMap.has(user.reffer_by)) {
      rootNodes.push(user);
    }
  });

  users.forEach((user) => {
    if (user.referrals.length > 0 && !rootNodes.includes(user)) {
      rootNodes.push(user);
    }
  });


  return rootNodes;
}

// Recursive function to calculate total business for a user and their referrals
const calculateTeamBusiness = (user) => {
  let totalBusiness = user.active_plan || 0;
  if (user.referrals && user.referrals.length > 0) {
    user.referrals.forEach((referral) => {
      totalBusiness += calculateTeamBusiness(referral);
    });
  }

  return totalBusiness;
};

const calculateBusinessForLegs = (users) => {
  const result = {};
  users.forEach((user) => {
    result[user.id] = calculateTeamBusiness(user);
  });
  return result;
};

// Update the reward for a user in the database
const updateRewardForUser = async (
  userId,
  reward,
  reward_level,
  user_reward_level,
  month
) => {
  const duration = reward <= 500 ? 1 : 1;

  return new Promise((resolve, reject) => {
    let sql;
    if (user_reward_level < reward_level) {
      sql = `
      UPDATE users 
      SET reward = reward + ${reward}, 
          reward_duration = ${duration},
          reward_level = ${reward_level},
          reward_remaining_months = ${duration}
      WHERE id = ${userId}
    `;
    } else if (user_reward_level == reward_level) {
      return resolve(null);
    }

    db.query(sql, (err, result) => {
      if (err) {
        console.error(`Error updating user reward for User ID ${userId}:`, err);
        return reject(new Error("Error updating user reward!"));
      }
      const sqlInsert = `INSERT INTO reward_transaction (user_id, amount) VALUES (?, ?)`;
      db.query(sqlInsert, [userId, reward], (err) => {
        if (err) {
          console.error(`Error logging reward transaction for User ID ${userId}:`, err);
          return reject(new Error("Error logging reward transaction!"));
        }
        resolve(result);
      });
    });
  });
};

// Calculate rewards for all users
const calculateRewardsForAllUsers = async (users) => {
  for (const user of users) {
    const user_reward_level = user.reward_level;
    const user_reward_remaining_months = user.reward_remaining_months;

    // Calculate business by legs
    const businessByLeg = calculateBusinessForLegs(user.referrals || []);
    const sortedLegs = Object.entries(businessByLeg)
      .map(([legId, totalBusiness]) => ({
        legId: parseInt(legId),
        totalBusiness,
      }))
      .sort((a, b) => b.totalBusiness - a.totalBusiness)
      .slice(0, 3); // Get top 3 legs

    const totalBusiness = sortedLegs.reduce(
      (sum, { totalBusiness }) => sum + totalBusiness,
      0
    );

    console.log(
      `User ${user.username} (ID: ${user.id}) has total business: ${totalBusiness}`
    );
    console.log("Top 3 Legs:", sortedLegs);

    let reward_level = -1;
    let reward = 0;

    for (let i = 0; i < thresholds.length; i++) {
      const thresholdAmount = thresholds[i];

      if (totalBusiness >= thresholdAmount) {
        const required40 = (thresholdAmount * 40) / 100;
        const required30A = (thresholdAmount * 30) / 100;
        const required30B = (thresholdAmount * 30) / 100;

        const [firstLeg = 0, secondLeg = 0, thirdLeg = 0] = sortedLegs.map(
          (leg) => leg.totalBusiness
        );

        if (
          firstLeg >= required40 &&
          secondLeg >= required30A &&
          thirdLeg >= required30B
        ) {
          reward_level = i;
          reward = rewardValues[i];
        }
      } else {
        break;
      }
    }

    if (reward_level >= 0) {
      if (user_reward_level == reward_level + 1 && user_reward_remaining_months == 0) {
        console.log("User reward level is not satisfying the condition.");
      } else {
        await updateRewardForUser(
          user.id,
          reward,
          reward_level + 1,
          user_reward_level,
          user_reward_remaining_months
        );
      }
    }
  }
};

// Main reward calculation controller
exports.reward = catchAsyncErrors(async (req, res, next) => {
  // const { setreward } = await fetchSetRoiFromAdminSettings();

  // if (setreward !== 1) {
  //   return res.status(404).json({ message: "UseAdmin not allowed reward" });
  // }

  try {
    console.log("first try")
    const users = await fetchAllUsers();
    const referralTree = buildReferralTree(users);
    await calculateRewardsForAllUsers(referralTree);
    res.json({ message: "Rewards calculated and updated successfully." });
  } catch (error) {
    console.error("Error in reward calculation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
