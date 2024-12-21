const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");
const asyncHandler = require("express-async-handler");
const fetchSetRoiFromAdminSettings = require("../utils/settings");

dotenv.config({ path: "backend/config/config.env" });

exports.getReferralTree = catchAsyncErrors(async (request, response, next) => {
    const { referral_code } = request.params;

    const fetchReferralTree = async (referralCode) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id,username,is_active,active_plan,created_at,email,status FROM users WHERE reffer_by = ?`;
            db.query(sql, [referralCode], async (err, result) => {
                if (err) {
                    console.error(`Error fetching tree for referral code ${referralCode}:`, err);
                    return reject(new ErrorHandler("Error fetching tree!", 500));
                }
                const tree = [];
                for (const user of result) {
                    tree.push({ ...user });
                }
                console.log(`Fetched tree for referral code ${referralCode}:`, tree);
                resolve(tree);
            });
        });
    };

    try {
        const referralTree = await fetchReferralTree(referral_code);
        if (referralTree.length > 0) {
            // console.log(`Referral tree found for code ${referral_code}`);
            response.status(200).json({ referralTree: referralTree });
        } else {
            // console.log(`No referral tree found for code ${referral_code}`);
            response.status(200).json({ referralTree: [] });
        }
    } catch (error) {
        console.error("Error fetching tree:", error);
        next(new ErrorHandler("Error fetching tree!", 500));
    }
});

exports.getFullReferralTree = catchAsyncErrors(async (request, response, next) => {
    const { referral_code } = request.params;

    const fetchReferralTree = async (referralCode) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id, username, is_active, created_at,active_plan, email, status, refferal_code FROM users WHERE reffer_by = ?`;
            db.query(sql, [referralCode], async (err, result) => {
                if (err) {
                    console.error(`Error fetching full tree for referral code ${referralCode}:`, err);
                    return reject(new ErrorHandler("Error fetching tree!", 500));
                }
                const tree = [];
                for (const user of result) {
                    const userTree = await fetchReferralTree(user.refferal_code);
                    tree.push({ ...user, referrals: userTree });
                }
                console.log(`Fetched full tree for referral code ${referralCode}:`, tree);
                resolve(tree);
            });
        });
    };

    try {
        const referralTree = await fetchReferralTree(referral_code);
        if (referralTree.length > 0) {
            console.log(`Full referral tree found for code ${referral_code}`);
            response.status(200).json({ treeData: referralTree });
        } else {
            console.log(`No full referral tree found for code ${referral_code}`);
            response.status(200).json({ treeData: [] });
        }
    } catch (error) {
        console.error("Error fetching full referral tree:", error);
        next(new ErrorHandler("Error fetching tree!", 500));
    }
});
const fetchAllUsers = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, is_active, roi_day, refferal_code, reffer_by FROM users`;
        db.query(sql, (err, result) => {
            if (err) {
                console.error("Error fetching all users:", err);
                return reject(new Error("Error fetching users!"));
            }
            resolve(result);
        });
    });
};

const insertTransaction = async (userId,userby_id, type, amount, onamount, percent) => {
    return new Promise((resolve, reject) => {
        if (amount === 0) {
            console.log(`No commission to insert for user ${userId}.`);
            return resolve();
        }
        const transactionQuery = `
            INSERT INTO invest_level_transaction (user_id,userby_id, type, amount, onamount, percent)
            VALUES (?, ?, ?, ?, ?,?)
        `;
        const transactionData = [userId,userby_id, type, amount, onamount, percent];

        db.query(transactionQuery, transactionData, (error, results) => {
            if (error) {
                console.error(`Error inserting transaction for user ${userId}:`, error);
                return reject(new Error("Error inserting transaction!"));
            }
            resolve(results);
        });
    });
};

const fetchInvestmentPlan = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM invest_level`;
        db.query(sql, (err, result) => {
            if (err) {
                console.error("Error fetching investment plan:", err);
                return reject(new Error("Error fetching investment plan!"));
            }
            resolve(result); // Assuming only one row is fetched
        });
    });
};

const calculateCommissionForUser = async (user, investPlan) => {
    if (user.is_active !== "active") {
        return 0; // If the user is inactive, return 0 commission
    }

    let totalCommission = 0;

    // Level percentages for each level (up to level 20)
    const levelPercentages = [
        investPlan.level_1, investPlan.level_2, investPlan.level_3, investPlan.level_4, investPlan.level_5,
        investPlan.level_6, investPlan.level_7, investPlan.level_8, investPlan.level_9, investPlan.level_10,
        investPlan.level_11, investPlan.level_12, investPlan.level_13, investPlan.level_14, investPlan.level_15,
        investPlan.level_16, investPlan.level_17, investPlan.level_18, investPlan.level_19, investPlan.level_20
    ];
    const directChildrenCount = user.referrals.length;
    const maxLevel = Math.min(directChildrenCount * 2, 20); // Limit to 20 levels max

    // Queue to process referrals level by level
    const queue = []; 
    let currentLevel = 0; // Start from Level 1

    // Start with direct children (Level 1)
    queue.push(...user.referrals.map(child => ({ referral: child, level: 1 })));

    while (queue.length > 0) {
        const { referral, level } = queue.shift(); // Get the first referral in the queue

        // Calculate commission for the current level
        if (referral.is_active === "active" && level <= maxLevel) {
            const commission = (referral.roi_day || 0) * (levelPercentages[level - 1] / 100);
            totalCommission += commission;

            await insertTransaction(user.id, referral.id, `invest Level ${level}`, commission, referral.roi_day, levelPercentages[level - 1]);

            // If the referral has its own referrals (children), add them to the queue for the next level
            if (referral.referrals && level < levelPercentages.length) {
                queue.push(...referral.referrals.map(child => ({ referral: child, level: level + 1 })));
            }
        }
    }

    return totalCommission // Return total commission calculated for the user
};

const updateUserCommission = async (userId, newCommission) => {
    return new Promise((resolve, reject) => {
        if (isNaN(newCommission)) {
            console.error(`Invalid commission value for user ${userId}:`, newCommission);
            return reject(new Error("Invalid commission value!"));
        }

        const sqlUpdate = `
            UPDATE users 
            SET invesmetn_level_income =  ?, investment_month = investment_month + ? WHERE id = ?
        `;
        db.query(sqlUpdate, [newCommission, newCommission,userId], (err) => {
            if (err) {
                console.error(`Error updating user commission for user ${userId}:`, err);
                return reject(new Error("Error updating user commission!"));
            }
            resolve();
        });
    });
};


const calculateCommissionForAllUsers = async (request, response, next) => {
    try {
        const users = await fetchAllUsers();
        const userMap = new Map();
        const Plan = await fetchInvestmentPlan(); // Fetch percentages for 20 levels
        const investPlan=Plan[0]
        const compoundPlan=Plan[1]
        // Initialize referrals array for each user
        users.forEach(user => {
            user.referrals = [];
            userMap.set(user.refferal_code, user);
        });

        // Build referral tree
        users.forEach(user => {
            const parent = userMap.get(user.reffer_by);
            if (parent) {
                parent.referrals.push(user); // Attach user to parent
            } else if (user.reffer_by && user.reffer_by.trim() !== "") {
                console.warn(`User ${user.id} has an invalid reffer_by code: ${user.reffer_by}`);
            }
        });

        // Calculate commissions iteratively
        const queue = [];
        users.forEach(user => {
            if (!user.reffer_by || user.reffer_by.trim() === '') {
                queue.push(user); // Add top-level users to the queue
            }
        });

        while (queue.length > 0) {
            const user = queue.shift(); 

            const data = await calculateCommissionForUser(user, investPlan,compoundPlan);
            console.log(data , "checkk")
            await updateUserCommission(user.id, data);

            for (const referral of user.referrals) {
                queue.push(referral);  
            }
        }
        response.status(200).json({ message: "All commissions calculated and updated successfully." });
    } catch (error) {
        console.error("Error calculating commissions:", error);
    }
};



exports.calculateCommissionForAllUsers = calculateCommissionForAllUsers;

