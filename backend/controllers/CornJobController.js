const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const ErrorHandler = require("../utils/errorHandler");
const dotenv = require("dotenv");
const db = require("../config/database");
const fetchSetRoiFromAdminSettings = require("../utils/settings");
dotenv.config({ path: "backend/config/config.env" });

const fetchUsers = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, plan_id, active_plan,compound,is_active,roi_status, total_team,business,refferal_code,reffer_by,direct_income,roi_income, investment_month,reward,comound_roi_day,compund_roi_total ,activation_date FROM users WHERE is_active = 'active'`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        return reject(new ErrorHandler("Error fetching users!", 500));
      }
      // console.log(`Fetched ${result.length} active users`);
      resolve(result);
    });
  });
};

const updateUserROIIncome = async (userId, roiIncome, compoundROI) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET roi_income = roi_income + ?, roi_day = ?,comound_roi_day = ?,compund_roi_total=compund_roi_total+ ? ,compound=compound+? WHERE id = ? and roi_status="open"`;
    db.query(sql, [roiIncome, roiIncome,compoundROI,compoundROI,compoundROI, userId], (err, result) => {
      if (err) {
        console.error(`Error updating ROI income for user ${userId}:`, err);
        return reject(new ErrorHandler("Error updating ROI income!", 500));
      }
      // console.log(`Updated ROI income for user ${userId}`);
      resolve(result);
    });
  });
};

const fetchPlanById = async (planId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT ROI_overall,compound_roi FROM plans WHERE id = ?`;
    db.query(sql, [planId], (err, result) => {
      if (err) {
        console.error(`Error fetching plan details for plan ${planId}:`, err);
        return reject(new ErrorHandler("Error fetching plan details!", 500));
      }
      if (result.length === 0) {
        console.warn(`Plan with ID ${planId} not found`);
        return reject(new ErrorHandler("Plan not found!", 404));
      }
      // console.log(`Fetched plan details for plan ${planId}`);
      resolve(result[0]);
    });
  });
};

exports.updateROIIncomeForUsers = catchAsyncErrors(async (request, response, next) => {
  try {
    const { setroi } = await fetchSetRoiFromAdminSettings();
   

    if (setroi !== 1) {
      // console.log("Admin has disabled ROI updates");
      return response.status(404).json({ message: "Admin not allowed ROI" });
    }

    const users = await fetchUsers();
    for (const user of users) {
      const { id, plan_id, active_plan,compound ,refferal_code,comound_roi_day} = user;
  
      if (!plan_id) {
        console.warn(`User ${id} does not have a valid plan_id`);
        continue;
      }

      let planDetails;
      try {
        planDetails = await fetchPlanById(plan_id);
      } catch (error) {
        console.warn(`Plan for user ${id} with plan_id ${plan_id} not found`);
        continue;
      }

      let roi_percentage = planDetails.ROI_overall;
      let compound_roi = planDetails.compound_roi;

      const roiIncome = (active_plan * roi_percentage) / 3000;
      const roiCompoundIncome = ((compound + comound_roi_day)* compound_roi) / 3000;
      await updateUserROIIncome(id, roiIncome.toFixed(2),roiCompoundIncome.toFixed(2));

      const transactionQuery = `INSERT INTO roi_transaction (user_id, type, amount, onamount, percent) VALUES (?, ?, ?, ?, ?)`;
      const transactionData = [id, 'Invest ROI', roiIncome, active_plan, planDetails.ROI_overall];
      const compoundtransactionQuery = `INSERT INTO roi_transaction (user_id, type, amount, onamount, percent) VALUES (?, ?, ?, ?, ?)`;
      const compoundtransactionData = [id, 'Compound ROI', roiCompoundIncome, compound, planDetails.compound_roi];

      await new Promise((resolve, reject) => {
        db.query(transactionQuery, transactionData, (error) => {
          if (error) {
            console.error(`Error inserting transaction for user ${id}:`, error);
            return reject(new ErrorHandler("Error inserting transaction!", 500));
          }
          db.query(compoundtransactionQuery, compoundtransactionData, (error) => {
            if (error) {
              console.error(`Error inserting transaction for user ${id}:`, error);
              return reject(new ErrorHandler("Error inserting transaction!", 500));
            }
            resolve();
          });
        });
      });
    }

    // console.log("ROI incomes updated successfully");
    response.status(200).json({ message: "ROI incomes updated successfully" });
  } catch (error) {
    console.error("Error updating ROI incomes:", error);
    // next(new ErrorHandler("Error updating ROI incomes!", 500));
  }

});

exports.calculateTeamBonusesForAllUsers = catchAsyncErrors(async (req, res, next) => {
  const calculateTotalDeposits = async (userId) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT SUM(amount) as totalDeposits FROM user_deposite WHERE user_id = ? AND status IN ('complete', 'ByAdmin') AND createdAT >= NOW() - INTERVAL 3 MONTH`;
      db.query(sql, [userId], (err, result) => {
        if (err) {
          console.error(`Error calculating deposits for user ${userId}:`, err);
          return reject(new ErrorHandler("Error calculating total deposits!", 500));
        }
        // console.log(`User ${userId} has total deposits of ${result[0]?.totalDeposits || 0}`);
        resolve(result[0]?.totalDeposits || 0);
      });
    });
  };

  const updateSalaryBasedOnDeposits = async (userId, totalDeposits) => {
    let salaryIncrement = 0;
    if (totalDeposits >= 55000) {
      salaryIncrement = 300;
    } else if (totalDeposits >= 25000) {
      salaryIncrement = 200;
    } else if (totalDeposits >= 10000) {
      salaryIncrement = 100;
    }

    if (salaryIncrement > 0) {
      await new Promise((resolve, reject) => {
        const sql = `UPDATE users SET salary = salary + ? WHERE id = ?`;
        db.query(sql, [salaryIncrement, userId], (err) => {
          if (err) {
            console.error(`Error updating salary for user ${userId}:`, err);
            return reject(new ErrorHandler("Error updating salary!", 500));
          }

          const salarySql = `INSERT INTO salary (amount, user_id) VALUES (?, ?)`;
          db.query(salarySql, [salaryIncrement, userId], (err) => {
            if (err) {
              console.error(`Error inserting salary record for user ${userId}:`, err);
              return reject(new ErrorHandler("Error inserting salary record!", 500));
            }
            // console.log(`Salary updated for user ${userId}`);
            resolve();
          });
        });
      });
    } else {
      console.log(`No salary update for user ${userId}, total deposits are too low.`);
    }
  };

  const fetchReferralTreeWithDeposits = async (referralCode) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id, refferal_code FROM users WHERE reffer_by = ?`;
      db.query(sql, [referralCode], async (err, result) => {
        if (err) {
          console.error(`Error fetching referral tree for code ${referralCode}:`, err);
          return reject(new ErrorHandler("Error fetching referral tree!", 500));
        }

        let totalDepositsInTree = 0;
        for (const user of result) {
          const userDeposits = await calculateTotalDeposits(user.id);
          const childDeposits = await fetchReferralTreeWithDeposits(user.refferal_code);
          totalDepositsInTree += userDeposits + childDeposits;
        }

        resolve(totalDepositsInTree);
      });
    });
  };

  try {
    const fetchAllUsers = async () => {
      return new Promise((resolve, reject) => {
        const sql = `SELECT id, refferal_code,is_active,business,direct_income,roi_income, investment_month,reward FROM users where is_active = 'active'`;
        db.query(sql, (err, users) => {
          if (err) {
            console.error("Error fetching users:", err);
            return reject(new ErrorHandler("Error fetching users!", 500));
          }
          // console.log(`Fetched ${users.length} users`);
          resolve(users); // Ensure the promise is resolved with users
        });
      });
    };
  
    const allUsers = await fetchAllUsers(); // Wait for users to be fetched
  
    for (const user of allUsers) {
      if (user.business <= user.direct_income + user.roi_income + user.investment_month + user.reward) {
        const sql2 = `UPDATE users SET active='inactive' WHERE id=${user.id}`;
        
        await new Promise((resolve, reject) => { // Handle the update query as a promise
          db.query(sql2, (err, result) => {
            if (err) {
              console.error("Error updating user:", err);
              return reject(new ErrorHandler("Error updating user!", 500));
            }
            // console.log(`User ${user.id} set to inactive`);
            resolve(result);
          });
        });
      } else {
        const totalDepositsInTree = await fetchReferralTreeWithDeposits(user.refferal_code);
        // console.log(`Total deposits for user ${user.id}'s tree: ${totalDepositsInTree}`);
        await updateSalaryBasedOnDeposits(user.id, totalDepositsInTree); // Ensure this is awaited
      }
    }
  
    // console.log("Team bonuses updated successfully");
    res.status(200).json({ message: "Team bonuses updated successfully" });
  } catch (err) {
    console.error("Error updating team bonuses:", err);
    next(new ErrorHandler("Error updating team bonuses", 500));
  }
  
});



// 4* busiessnsss --------------------------------------------------------------

