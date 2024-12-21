

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");
const asyncHandler = require("express-async-handler");
const fetchSetRoiFromAdminSettings = require("../utils/settings");
dotenv.config({ path: "backend/config/config.env" });
const calculateCompoundLevelForAllUsers=require("./compoundController")


exports.getListOfWithdrawalRequest = catchAsyncErrors(
  async (request, response, next) => {
  let sql = `SELECT withdrawal_request.*, users.email,users.bep20, users.trc20 FROM withdrawal_request LEFT JOIN users ON withdrawal_request.user_id = users.id;`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching withdrawal_request:", err);
        return next(
          new ErrorHandler("Error fetching withdrawal_request!", 500)
        );
      }
      if (result.length > 0) {
        return response.status(200).json({ allwithdrawal: result });
      } else {
        return response.status(200).json({ allwithdrawal: [] });
      }
    });
  }
);
exports.getListOfWithdrawalRequestById = catchAsyncErrors(
  async (request, response, next) => {
    const { user_id } = request.params;

    let sql =`SELECT withdrawal_request.*, users.email,users.email,users.bep20, users.trc20
    FROM withdrawal_request
    LEFT JOIN users ON withdrawal_request.user_id = users.id where user_id = '${user_id}'`; ;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching withdrawal_request:", err);
        return next(
          new ErrorHandler("Error fetching withdrawal_request!", 500)
        );
      }
      if (result.length > 0) {
        return response.status(200).json({ singleWithdrawal: result });
      } else {
        return response.status(200).json({ singleWithdrawal: [] });
      }
    });
  }
);

exports.updateWithdrawalRequest = asyncHandler(async (req, res, next) => {
    const { status, amount, user_id ,type} = req.body;
    const { id } = req.params;

    const updateWithdrawalSql = `UPDATE withdrawal_request SET status = ?, acceptat = NOW() WHERE id = ?`;
    db.query(updateWithdrawalSql, [status, id], (err, depositeResult) => {
      if (err) {
        console.error("Error updating user_deposite:", err);
        return next(new ErrorHandler("Error updating user_deposite", 500));
      }

      // Check if update was successful
      if (depositeResult.affectedRows === 0) {
        return next(new ErrorHandler("No user_deposite found or no changes applied", 404));
      }

      // If status is 'complete', update the users table business column
      if (status === 'decline') {
        const updateBusinessSql = `UPDATE users SET business = business + ? WHERE id = ?`;
        db.query(updateBusinessSql, [amount, user_id], (err, userResult) => {
          if (err) {
            console.error("Error updating user's business balance:", err);
            return next(new ErrorHandler("Error updating user's business balance", 500));
          }

          // Check if update was successful
          if (userResult.affectedRows === 0) {
            return next(new ErrorHandler("No user found or no changes applied to business balance", 404));
          }

          // Respond with success message
          res.status(200).json({ success: true, message: "Update successful" });
        });
      } else {
        // If status is not 'complete', respond with success message for deposite update
        res.status(200).json({ success: true, message: "Update successful for withdrawal_request" });
      }
    });
});

exports.deleteWithdrawalRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(
      new ErrorHandler("withdrawal_request number (ID) is required", 400)
    );
  }

  const sql = `DELETE FROM withdrawal_request WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error during deletion:", err);
      return next(new ErrorHandler("Error during deletion", 500));
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Deletion successful" });
    } else {
      return next(
        new ErrorHandler(
          "withdrawal_request not found or no changes applied",
          404
        )
      );
    }
  });
});

exports.addWithdrawalRequest = catchAsyncErrors(async (request, response, next) => {
  const { user_id, amount,check } = request.body;
  console.log(request.body)
  if (amount < 25) {
    return response.status(404).json({ message: "Amount less then 25 not allowed" });
  }
  const checkBalanceSql = `SELECT business, direct_income,active_plan, investment_month, reward, compound_level_total, wallet FROM users WHERE id = ?`;
  const { setwithdrawal } = await fetchSetRoiFromAdminSettings();

  if (setwithdrawal !== 1) {
    return response.status(404).json({ message: "UseAdmin not allowed ROI" });
  }

  db.query(checkBalanceSql, [user_id], (err, results) => {
    if (err) {
      console.error("Error during balance check:", err);
      return next(new ErrorHandler("Error during balance check!", 500));
    }

    if (results.length === 0) {
      return response.status(404).json({ message: "User not found" });
    }

    const { business, direct_income,active_plan, investment_month, reward, compound_level_total, wallet } = results[0];

    // Deduction calculation based on activation period
    let amountAfterDeduction = amount;
    let deductionAmount = amount * 0.10;
    let remainingAmount = amountAfterDeduction;
    let updatedDirectIncome = direct_income;
    let updatedActive_Plan = active_plan;
    let updatedBusiness = business;
    let updatedInvestmentMonth = investment_month;
    let updatedReward = reward;
    let updatedCompoundLevelTotal = compound_level_total;
    // Deduct from each category in order
    if (remainingAmount > 0 && updatedDirectIncome > 0) {
      const deduction = Math.min(remainingAmount, updatedDirectIncome);
      updatedDirectIncome -= deduction;
      remainingAmount -= deduction;
    }
    if (remainingAmount > 0 && updatedActive_Plan > 0 && check) {
      const deduction = Math.min(remainingAmount, updatedActive_Plan);
      updatedActive_Plan -= deduction;
      remainingAmount -= deduction;
    }
    if (remainingAmount > 0 && updatedBusiness > 0 ) {
      const deduction = Math.min(remainingAmount, updatedBusiness);
      updatedBusiness -= deduction;
      remainingAmount -= deduction;
    }
    if (remainingAmount > 0 && updatedInvestmentMonth > 0) {
      const deduction = Math.min(remainingAmount, updatedInvestmentMonth);
      updatedInvestmentMonth -= deduction;
      remainingAmount -= deduction;
    }
    if (remainingAmount > 0 && updatedReward > 0) {
      const deduction = Math.min(remainingAmount, updatedReward);
      updatedReward -= deduction;
      remainingAmount -= deduction;
    }
    if (remainingAmount > 0 && updatedCompoundLevelTotal > 0) {
      const deduction = Math.min(remainingAmount, updatedCompoundLevelTotal);
      updatedCompoundLevelTotal -= deduction;
      remainingAmount -= deduction;
    }
    // Update the database with the new values
    const updateUserSql = `
      UPDATE users 
      SET 
        direct_income = ?, 
        business = ?, 
        active_plan = ?, 
        investment_month = ?, 
        reward = ?, 
        compound_level_total = ?
      WHERE id = ?
    `;

    db.query(
      updateUserSql,
      [updatedDirectIncome,updatedBusiness, updatedActive_Plan,updatedInvestmentMonth, updatedReward, updatedCompoundLevelTotal, user_id],
      (err, updateResult) => {
        if (err) {
          console.error("Error updating user balance columns:", err);
          return next(new ErrorHandler("Error updating user balance columns", 500));
        }

        // Insert withdrawal request record
        const insertSql = `INSERT INTO withdrawal_request (user_id, amount, type, deduction) VALUES (?, ?, ?, ?)`;
        db.query(insertSql, [user_id, amount-deductionAmount, 'working', deductionAmount], (err, result) => {
          if (err) {
            console.error("Error during withdrawal_request creation:", err);
            return next(new ErrorHandler("Error during withdrawal_request creation!", 500));
          }

          if (result.affectedRows > 0) {
            response.status(200).json({
              success: true,
              message: `Withdrawal request sent successfully with a deduction of ${deductionAmount}`,
            });
          } else {
            response.status(400).json({ error: "Withdrawal request could not be sent" });
          }
        });
      }
    );
  });
});

exports.withdrawalCompound = catchAsyncErrors(async (request, response, next) => {
  try {
    const { user_id, amount,deduction} = request.body;
    const { setwithdrawal } = await fetchSetRoiFromAdminSettings();

    if (setwithdrawal !== 1) {
      return response.status(404).json({ message: "UseAdmin not allowed ROI" });
    }

    let amountAfterDeduction = amount; 

    const insertSql = `INSERT INTO withdrawal_request (user_id, amount, type , deduction) VALUES (?, ?, ?,?)`;

    db.query(insertSql, [user_id, amountAfterDeduction, 'compound',deduction], (err, result) => {
      if (err) {
        console.error("Error during withdrawal_request insertion:", err);
        return next(new ErrorHandler("Error during withdrawal_request creation!", 500));
      }

      if (result.affectedRows > 0) {
        const updateSql = `UPDATE users SET compound = 0 WHERE id = ?`;
        db.query(updateSql, [user_id], (err, result) => {
          if (err) {
            console.error("Error during updating compound to 0:", err);
            return next(new ErrorHandler("Error during withdrawal_request creation!", 500));
          }

          if (result.affectedRows > 0) {
            response.status(200).json({
              success: true,
              message: `Withdrawal request sent successfully`,
            });
          } else {
            console.error("Failed to update user's compound to 0");
            response.status(400).json({ error: "Withdrawal request could not be sent" });
          }
        });
      } else {
        console.error("Failed to insert into withdrawal_request");
        response.status(400).json({ error: "Withdrawal request could not be sent" });
      }
    });
  } catch (error) {
    console.error("Unexpected error in withdrawalCompound:", error);
    next(error);
  }
});

exports.updateCompoundWithdrawalRequest = asyncHandler(async (req, res, next) => {
  const { status, amount, user_id ,type} = req.body;
  const { id } = req.params;

  const updateWithdrawalSql = `UPDATE withdrawal_request SET status = ?, acceptat = NOW() WHERE id = ?`;
  db.query(updateWithdrawalSql, [status, id], (err, depositeResult) => {
    if (err) {
      console.error("Error updating user_deposite:", err);
      return next(new ErrorHandler("Error updating user_deposite", 500));
    }

    // Check if update was successful
    if (depositeResult.affectedRows === 0) {
      return next(new ErrorHandler("No user_deposite found or no changes applied", 404));
    }

    // If status is 'complete', update the users table business column
    if (status === 'decline') {
      const updateBusinessSql = `UPDATE users SET compound = ? WHERE id = ?`;
      db.query(updateBusinessSql, [amount, user_id], (err, userResult) => {
        if (err) {
          console.error("Error updating user's business balance:", err);
          return next(new ErrorHandler("Error updating user's business balance", 500));
        }

        // Check if update was successful
        if (userResult.affectedRows === 0) {
          return next(new ErrorHandler("No user found or no changes applied to business balance", 404));
        }

        // Respond with success message
        res.status(200).json({ success: true, message: "Update successful" });
      });
    } else {
      // If status is not 'complete', respond with success message for deposite update
      res.status(200).json({ success: true, message: "Update successful for withdrawal_request" });
    }
  });
});

exports.debitAmount = asyncHandler(async (req, res, next) => {
  const { id, business, action } = req.body.updatedData;
  let sql;
  let transactionSql;

  if (action === "debit") {
    sql = `UPDATE users SET business = business - ? WHERE id = ?`;
    transactionSql = `INSERT INTO withdrawal_request (user_id, amount, status,acceptat) VALUES (?, ?, 'TRN-ADM002',NOW())`;
  } else {
    sql = `UPDATE users SET business = business + ? WHERE id = ?`;
    transactionSql = `INSERT INTO user_deposite (user_id, amount, status,acceptat) VALUES (?, ?, 'TRN-ADM002',NOW())`;
  }

  db.query(sql, [business, id], (err, result) => {
    if (err) {
      console.error("Error during update:", err);
      return next(new ErrorHandler("Error during update", 500));
    }

    if (result?.affectedRows > 0) {
      db.query(transactionSql, [id, business], (err, result) => {
        if (err) {
          console.error("Error during transaction update:", err);
          return next(new ErrorHandler("Error during transaction update", 500));
        }

        if (result?.affectedRows > 0) {
          res
            .status(200)
            .json({ success: true, message: `${action} successful` });
        } else {
          next(
            new ErrorHandler(`${action} not found or no changes applied`, 404)
          );
        }
      });
    } else {
      next(new ErrorHandler(`${action} not found or no changes applied`, 404));
    }
  });
});

exports.compoundAmount = asyncHandler(async (request, response, next) => {
  const { user_id, amount } = request.body;
  const checkBalanceSql = `SELECT business, wallet,compound FROM users WHERE id = ?`;
  console.log(user_id, amount, 'checkkk')
  db.query(checkBalanceSql, [user_id], (err, results) => {
    if (err) {
      console.error("Error during balance check:", err);
      return next(new ErrorHandler("Error during balance check!", 500));
    }
    if (results.length === 0) {
      return response.status(404).json({ message: "User not found" });
    }
    const{business, wallet} = results[0];
    if (amount > wallet) {
      return response
        .status(400)
        .json({ message: `You  is less (${wallet})` });
    }

    const insertSql = `update users set business=business-?, compound = compound + ?,level_compound=?, compound_date = NOW() where id=?`;
    db.query(insertSql, [amount,amount,amount, user_id], (error, result) => {
      if (error) {
        console.error("Error during withdrawal_request creation:", error);
        return next(
          new ErrorHandler("Error during withdrawal_request creation!", 500)
        );
      }
      if (result.affectedRows > 0) {
        calculateCompoundLevelForAllUsers(user_id)
        response
          .status(200)
          .json({
            success: true,
            message: `amount compound successfully ${amount }`,
          });
      } else {
        console.log(error)
        response
          .status(400)
          .json({ error: "Withdrawal request could not be sent" });
      }
    });
  });
}
);

exports.addROIWithdrawalRequest = catchAsyncErrors(async (request, response, next) => {
  try {
    const { user_id, amount,deduction} = request.body;
    const { setwithdrawal } = await fetchSetRoiFromAdminSettings();

    if (setwithdrawal !== 1) {
      return response.status(404).json({ message: "UseAdmin not allowed ROI" });
    }

    let deductionAmount = amount * 0.10;
    let amountAfterDeduction = amount-deductionAmount; 

    const insertSql = `INSERT INTO withdrawal_request (user_id, amount, type , deduction) VALUES (?, ?, ?,?)`;

    db.query(insertSql, [user_id, amountAfterDeduction, 'ROI',deductionAmount], (err, result) => {
      if (err) {
        console.error("Error during withdrawal_request insertion:", err);
        return next(new ErrorHandler("Error during withdrawal_request creation!", 500));
      }

      // if (result.affectedRows > 0) {
      //   const updateSql = `UPDATE users SET roi_income = roi_income-? WHERE id = ?`;
      //   db.query(updateSql, [amount,user_id], (err, result) => {
      //     if (err) {
      //       console.error("Error during updating compound to 0:", err);
      //       return next(new ErrorHandler("Error during withdrawal_request creation!", 500));
      //     }

      //     if (result.affectedRows > 0) {
            response.status(200).json({
              success: true,
              message: `Withdrawal request sent successfully`,
            });
      //     } else {
      //       console.error("Failed to update user's compound to 0");
      //       response.status(400).json({ error: "Withdrawal request could not be sent" });
      //     }
      //   });
      // } else {
      //   console.error("Failed to insert into withdrawal_request");
      //   response.status(400).json({ error: "Withdrawal request could not be sent" });
      // }
    });
  } catch (error) {
    console.error("Unexpected error in withdrawalCompound:", error);
    next(error);
  }
});

exports.updateROIWithdrawalRequest = asyncHandler(async (req, res, next) => {
  const { status, amount, user_id ,type} = req.body;
  const { id } = req.params;

  const updateWithdrawalSql = `UPDATE withdrawal_request SET status = ?, acceptat = NOW() WHERE id = ?`;
  db.query(updateWithdrawalSql, [status, id], (err, depositeResult) => {
    if (err) {
      console.error("Error updating user_deposite:", err);
      return next(new ErrorHandler("Error updating user_deposite", 500));
    }

    // Check if update was successful
    if (depositeResult.affectedRows === 0) {
      return next(new ErrorHandler("No user_deposite found or no changes applied", 404));
    }
    res.status(200).json({ success: true, message: "Update successful" });

    // If status is 'complete', update the users table business column
   
  });
});