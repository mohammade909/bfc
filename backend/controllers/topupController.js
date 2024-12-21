const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");
const asyncHandler = require("express-async-handler");
const fetchSetRoiFromAdminSettings = require("../utils/settings");
dotenv.config({ path: "backend/config/config.env" });

exports.getListOfTopup = catchAsyncErrors(async (request, response, next) => {
  let sql = `SELECT 
    t.*,
    u1.email AS userby_email,
    u2.email AS userto_email
FROM 
    topup t
LEFT JOIN 
    users u1 ON t.userby_id = u1.id
LEFT JOIN 
    users u2 ON t.userto_id = u2.id;
`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching Topup:", err);
      return next(new ErrorHandler("Error fetching Topup!", 500));
    }
    if (result.length > 0) {
      return response.status(200).json({ alltopup: result });
    } else {
      return response.status(200).json({ alltopup: [] });
    }
  });
});
exports.getListOfTopupById = catchAsyncErrors(
  async (request, response, next) => {
    const { user_id } = request.params;
    let sql = `SELECT 
    t.*,
    u2.email AS userto_email
FROM 
    topup t
LEFT JOIN 
    users u2 ON t.userto_id = u2.id where userby_id = '${user_id}'
`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching Topup:", err);
        return next(new ErrorHandler("Error fetching Topup!", 500));
      }
      if (result.length > 0) {
        return response.status(200).json({ singletopup: result });
      } else {
        return response.status(200).json({ singletopup: [] });
      }
    });
  }
);

exports.updateTopup = asyncHandler(async (req, res, next) => {
  const updatedFields = req.body;
  const { id } = req.params;
  const updateFieldsString = Object.keys(updatedFields)
    .map((key) => `${key}="${updatedFields[key]}"`)
    .join(", ");

  const sql = `UPDATE topup SET ${updateFieldsString} WHERE id = ${Number(
    id
  )};`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during update:", err);
      next(new ErrorHandler("Error during update", 500));
    }

    if (result?.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Update successful" });
    } else {
      next(new ErrorHandler("topup not found or no changes applied", 404));
    }
  });
});

exports.deleteTopup = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new ErrorHandler("Topup number (ID) is required", 400));
  }
  const sql = `DELETE FROM topup WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error during deletion:", err);
      return next(new ErrorHandler("Error during deletion", 500));
    }
    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Deletion successful" });
    } else {
      return next(
        new ErrorHandler("topup not found or no changes applied", 404)
      );
    }
  });
});

exports.addTopup = catchAsyncErrors(async (request, response, next) => {
  let { id, investment_amount, amount, userby_id, userto_id } = request.body;

  const { settopup } = await fetchSetRoiFromAdminSettings();
  if (settopup !== 1) {
    return response.status(404).json({ message: "UseAdmin not allowed ROI" });
  }

  if (investment_amount) {
    const checkBalanceSql = `SELECT business FROM users WHERE id = ?`;
    db.query(checkBalanceSql, [userby_id], (err, userResults) => {
      if (err) {
        console.error("Error during balance check:", err);
        return next(new ErrorHandler("Error during balance check!", 500));
      }
      if (userResults.length === 0) {
        return response.status(404).json({ message: "User not found" });
      }

      const { business } = userResults[0];

      if (investment_amount > business || investment_amount < 0) {
        return response.status(400).json({ message: `Your balance is less (${business})` });
      }

      // Deduct the amount from the userby_id's business balance
      const updateUserbySql = `UPDATE users SET business = business - ? WHERE id = ?`;
      db.query(updateUserbySql, [investment_amount, userby_id], (err, result) => {
        if (err) {
          console.error("Error during balance update:", err);
          return next(new ErrorHandler("Error during balance update!", 500));
        }
        if (result.affectedRows > 0) {
          // Add the amount to the userto_id's business balance
          const updateUsertoSql = `UPDATE users SET business = business + ? WHERE id = ?`;
          db.query(updateUsertoSql, [investment_amount, userto_id], (err, updateResult) => {
            if (err) {
              console.error("Error updating userto's business balance:", err);
              return next(new ErrorHandler("Error updating userto's business balance!", 500));
            }
            if (updateResult.affectedRows > 0) {
              const insertTopupSql = `INSERT INTO topup (userby_id, userto_id, amount) VALUES (?, ?, ?)`;
              db.query(insertTopupSql, [userby_id, userto_id, investment_amount], (err, insertResult) => {
                if (err) {
                  console.error("Error inserting top-up details:", err);
                  return next(new ErrorHandler("Error inserting top-up details!", 500));
                }
                if (insertResult.affectedRows > 0) {
                  response.status(200).json({
                    message: "Top-up request sent successfully",
                  });
                } else {
                  response.status(400).json({ error: "Failed to insert top-up details" });
                }
              });
            } else {
              response.status(400).json({ error: "Failed to update userto's business balance" });
            }
          });
        } else {
          response.status(400).json({ error: "Failed to update userby's business balance" });
        }
      });
    });
  } else {
    console.log('inside else');
    const fetchPlanSql = `SELECT Sponser_bonus FROM plans WHERE id = ?`;
    db.query(fetchPlanSql, [id], (err, planResults) => {
      if (err) {
        console.error("Error during plan fetch:", err);
        return next(new ErrorHandler("Error during plan fetch!", 500));
      }
      if (planResults.length === 0) {
        return response.status(404).json({ message: "Plan not found" });
      }

      const { Sponser_bonus } = planResults[0];
      const monthly_price = amount;
      const direct_amount = monthly_price * (Sponser_bonus / 100);
      const checkBalanceSql = `SELECT active_plan, business FROM users WHERE id = ?`;
      db.query(checkBalanceSql, [userby_id], (err, userResults) => {
        if (err) {
          console.error("Error during balance check:", err);
          return next(new ErrorHandler("Error during balance check!", 500));
        }
        if (userResults.length === 0) {
          return response.status(404).json({ message: "User not found" });
        }

        const { active_plan, business } = userResults[0];
        console.log(monthly_price, business, active_plan);

        if (monthly_price > business || monthly_price < 0 && userby_id == userto_id) {
          return response.status(400).json({ message: `Your balance is less (${business})` });
        }
        if (monthly_price < active_plan && userby_id == userto_id) {
          return response.status(400).json({ message: `Buy Bigger Plan the active` });
        }

        const updateUserbySql = `UPDATE users SET business = business - ? WHERE id = ?`;
        db.query(updateUserbySql, [monthly_price, userby_id], async (err, result) => {
          if (err) {
            console.error("Error during top-up creation:", err);
            return next(new ErrorHandler("Error during top-up creation!", 500));
          }
          if (result.affectedRows > 0) {
            console.log("run seccc");
            let updateUsertoSql = `UPDATE users SET is_active = "active", active_plan =active_plan + ?, plan_id = ?, activation_date = NOW() WHERE id = ?`;
            db.query(updateUsertoSql, [monthly_price, id, userto_id], (err, updateResult) => {
              if (err) {
                console.error("Error updating userto's business balance:", err);
                return next(new ErrorHandler("Error updating userto's business balance:", 500));
              }
              if (updateResult.affectedRows > 0) {
                const insertTopupSql = `INSERT INTO topup (userby_id, userto_id, amount) VALUES (?, ?, ?)`;
                db.query(insertTopupSql, [userby_id, userto_id, monthly_price], async (err, insertResult) => {
                  if (err) {
                    console.error("Error inserting top-up details:", err);
                    return next(new ErrorHandler("Error inserting top-up details!", 500));
                  }
                  if (insertResult.affectedRows > 0) {
                    const checkRefferSql = `SELECT reffer_by FROM users WHERE id = ?`;
                    db.query(checkRefferSql, [userto_id], (err, userResult) => {
                      if (err) {
                        console.error("Error during balance check:", err);
                        return next(new ErrorHandler("Error during balance check!", 500));
                      }
                      console.log(userResult);
                      if (userResult.length === 0) {
                        return response.status(404).json({ message: "User not found" });
                      }

                      const { reffer_by } = userResult[0];
                      // Start distributing direct income
                      distributeDirectIncome(reffer_by, amount, Sponser_bonus, monthly_price, 1, userto_id, response);
                      response.status(200).json({ message: "Toptup successfuly" });

                    });
                  } else {
                    response.status(400).json({ error: "Failed to insert top-up details" });
                  }
                });
              } else {
                response.status(400).json({ error: "Failed to update userto's business balance" });
              }
            });
          } else {
            response.status(400).json({ error: "Top-up request could not be sent" });
          }
        });
      });
    });
  }
});

function distributeDirectIncome(reffer_by, amount, Sponser_bonus, monthly_price, level, userto_id, response) {
  if (level > 7 || !reffer_by) {
    return response.status(200).json({ message: "Top-up completed successfully" }); // Send success message after distribution is done
  } // Limit recursion to 5 levels and stop if no reffer_by

  let income;
  let percentage;
  switch (level) {
    case 1:
      income = amount * 0.04;
      percentage = Sponser_bonus // 5%
      break;
    case 2:
    case 3:
      income = amount * 0.0050; // 0.25%
      percentage = 0.50
      break;
    case 4:
    case 5:
      income = amount * 0.0050;
      percentage =  0.50 // 0.25%
      break;
    case 6:
    case 8:
      income = amount * 0.0050;
      percentage =  0.50 // 0.25%
      break;
    default:
      return; // Should never reach here
  }

  // Step 1: Update the direct income of the user based on their referral code
  const updateDirectIncomeSql = `UPDATE users SET direct_income = direct_income + ? WHERE refferal_code = ? and is_active='active'`;
  db.query(updateDirectIncomeSql, [income, reffer_by], (err, directIncomeResult) => {
    if (err) {
      console.error("Error updating direct income:", err);
      return; // Handle error
    }

    // Step 2: Ensure directIncomeResult contains affectedRows
    if (directIncomeResult.affectedRows > 0) {
      // Fetch user ID based on reffer_by
      const fetchUserIdSql = `SELECT id FROM users WHERE refferal_code = ?`;
      db.query(fetchUserIdSql, [reffer_by], (err, userResult) => {
        if (err) {
          console.error("Error fetching user ID:", err);
          return;
        }

        if (userResult.length > 0) {
          const affected_user_id = userResult[0].id;
          console.log(affected_user_id,userto_id)
          // Step 3: Insert the direct transaction after updating the direct income
          const insertTransactionSql = `INSERT INTO direct_transaction (user_id, amount, userby_id, percent, onamount) VALUES (?, ?, ?, ?, ?)`;
          db.query(insertTransactionSql, [affected_user_id, income, userto_id, percentage, monthly_price], (err, transactionResult) => {
            if (err) {
              console.error("Error inserting direct transaction:", err);
              return response.status(500).json({ error: "Error inserting direct transaction" });
            }

            // Step 4: Ensure the transaction was inserted
            if (transactionResult.affectedRows > 0) {
              // Step 5: Fetch the next referral (reffer_by) for the next level of income distribution
              const fetchRefferBySql = `SELECT reffer_by FROM users WHERE refferal_code = ?`;
              db.query(fetchRefferBySql, [reffer_by], (err, refferByResult) => {
                if (err) {
                  console.error("Error fetching referrer:", err);
                  return;
                }

                if (refferByResult.length > 0) {
                  const nextRefferBy = refferByResult[0].reffer_by;

                  // Recurse to the next level up
                  distributeDirectIncome(nextRefferBy, amount, Sponser_bonus, monthly_price, level + 1, userto_id, response);
                }
              });
            } else {
              response.status(400).json({ error: "Failed to insert direct transaction" });
            }
          });
        } else {
          response.status(400).json({ error: "User not found for reffer_by" });
        }
      });
    } else {
      response.status(400).json({ error: "Failed to update direct income" });
    }
  });
}

exports.addReTopup = catchAsyncErrors(async (request, response, next) => {
  let { id, investment_amount,amount, userby_id } = request.body;
  const { settopup } = await fetchSetRoiFromAdminSettings();

  if (settopup !== 1) {
    return response.status(404).json({ message: "UseAdmin not allowed ROI" });
  }

  if (investment_amount) {
    const checkBalanceSql = `SELECT business , active_plan FROM users WHERE id = ?`;
    db.query(checkBalanceSql, [userby_id], (err, userResults) => {
      if (err) {
        console.error("Error during balance check:", err);
        return next(new ErrorHandler("Error during balance check!", 500));
      }
      if (userResults.length === 0) {
        return response.status(404).json({ message: "User not found" });
      }

      const { business,active_plan } = userResults[0];

      if (investment_amount > business || investment_amount < 0) {
        return response
          .status(400)
          .json({ message: `Your balance is less (${business})` });
      }

      // Deduct the amount from the userby_id's business balance
      const updateUserbySql = `UPDATE users SET business = business - ?, active_plan = active_plan + ?, activation_date = NOW() WHERE id = ?`;
      db.query(
        updateUserbySql,
        [investment_amount, investment_amount, userby_id],
        (err, result) => {
          if (err) {
            console.error("Error during balance update:", err);
            return next(new ErrorHandler("Error during balance update!", 500));
          }
          if (result.affectedRows > 0) {
            // Add the amount to the userto_id's business balance
            const insertTopupSql = `INSERT INTO topup (userby_id, userto_id, amount) VALUES (?, ?, ?)`;
            db.query(
              insertTopupSql,
              [userby_id, userby_id, investment_amount],
              (err, insertResult) => {
                if (err) {
                  console.error("Error inserting top-up details:", err);
                  return next(
                    new ErrorHandler("Error inserting top-up details!", 500)
                  );
                }
                if (insertResult.affectedRows > 0) {
                  return response
                    .status(200)
                    .json({ message: "Top-up request sent successfully" });
                } else {
                  return response
                    .status(400)
                    .json({ error: "Failed to insert top-up details" });
                }
              }
            );
          } else {
            return response
              .status(400)
              .json({ error: "Failed to update userby's business balance" });
          }
        }
      );
    });
  } else {
    const fetchPlanSql = `SELECT  Sponser_bonus FROM plans WHERE id = ?`;
    db.query(fetchPlanSql, [id], (err, planResults) => {
      if (err) {
        console.error("Error during plan fetch:", err);
        return next(new ErrorHandler("Error during plan fetch!", 500));
      }
      if (planResults.length === 0) {
        return response.status(404).json({ message: "Plan not found" });
      }

      const { Sponser_bonus } = planResults[0];
      const monthly_price=amount;
      const direct_amount = monthly_price * (Sponser_bonus / 100);
      console.log(monthly_price)
      const checkBalanceSql = `SELECT business ,active_plan FROM users WHERE id = ?`;
      db.query(checkBalanceSql, [userby_id], (err, userResults) => {
        if (err) {
          console.error("Error during balance check:", err);
          return next(new ErrorHandler("Error during balance check!", 500));
        }
        if (userResults.length === 0) {
          return response.status(404).json({ message: "User not found" });
        }

        const { business ,active_plan} = userResults[0];
        if (monthly_price > business || monthly_price < 0) {
          return response
            .status(400)
            .json({ message: `Your balance is less (${business})` });
        }

        if (monthly_price <= active_plan ) {
          return response
            .status(400)
            .json({ message: `Activate Bigger Plan` });
        }
        // Deduct the amount from the userby_id's business balance
        const updateUserbySql = `UPDATE users SET business = business - ?, is_active = "active", active_plan =active_plan + ?, plan_id = ?, activation_date = NOW() WHERE id = ?`;
        db.query(
          updateUserbySql,
          [monthly_price, monthly_price, id, userby_id],
          (err, result) => {
            if (err) {
              console.error("Error during top-up creation:", err);
              return next(
                new ErrorHandler("Error during top-up creation!", 500)
              );
            }
            if (result.affectedRows > 0) {
              const insertTopupSql = `INSERT INTO topup (userby_id, userto_id, amount) VALUES (?, ?, ?)`;
              db.query(
                insertTopupSql,
                [userby_id, userby_id, monthly_price],
                (err, insertResult) => {
                  if (err) {
                    console.error("Error inserting top-up details:", err);
                    return next(
                      new ErrorHandler("Error inserting top-up details:", 500)
                    );
                  }
                  if (insertResult.affectedRows > 0) {
                    const checkRefferSql = `SELECT reffer_by FROM users WHERE id = ?`;
                    db.query(checkRefferSql, [userby_id], (err, userResult) => {
                      if (err) {
                        console.error("Error during balance check:", err);
                        return next(
                          new ErrorHandler("Error during balance check!", 500)
                        );
                      }
                      if (userResult.length === 0) {
                        return response
                          .status(404)
                          .json({ message: "User not found" });
                      }

                      const { reffer_by } = userResult[0];
                      const updateDirectIncomeSql = `UPDATE users SET direct_income = direct_income + ? WHERE refferal_code = ?`;
                      db.query(
                        updateDirectIncomeSql,
                        [direct_amount, reffer_by],
                        (err, directIncomeResult) => {
                          if (err) {
                            console.error("Error updating direct income:", err);
                            return next(
                              new ErrorHandler(
                                "Error updating direct income:",
                                500
                              )
                            );
                          }
                          if (directIncomeResult.affectedRows > 0) {
                            return response.status(200).json({
                              success: true,
                              message:
                                "Top-up request sent successfully",
                            });
                          } else {
                            return response.status(400).json({
                              error: "Failed to update direct income",
                            });
                          }
                        }
                      );
                    });
                  } else {
                    return response
                      .status(400)
                      .json({ error: "Failed to insert top-up details" });
                  }
                }
              );
            } else {
              return response
                .status(400)
                .json({ error: "Top-up request could not be sent" });
            }
          }
        );
      });
    });
  }
});

exports.entryActivate = catchAsyncErrors(async (request, response, next) => {
  const { id } = request.body;
  const checkBalanceSql = `SELECT business ,entry_fees FROM users WHERE id=${id}`;

  db.query(checkBalanceSql, (err, result) => {
    if (err) {
      console.error("Error checking user balance:", err);
      return next(new ErrorHandler("Error during balance check!", 500));
    }

    if (result.length === 0) {
      return response.status(400).json({ message: "User not found" });
    }

    const currentBalance = result[0].business;
    const entryFees = result[0].entry_fees;

    // Check if the balance is sufficient
    if (currentBalance < 25) {
      return response.status(400).json({ success: false, message: "Insufficient balance" });
    }
    if (entryFees > 24) {
      return response.status(400).json({ success: false, message: "Entry already active" });
    }
    // If the user has enough balance, proceed to update
    const updateSql = `UPDATE users SET entry_fees = 25, business = business - 25 WHERE id=${id}`;

    db.query(updateSql, (err, result) => {
      if (err) {
        console.error("Error during entry activation:", err);
        return next(new ErrorHandler("Error during entry activation!", 500));
      }

      if (result.affectedRows > 0) {
        response.status(200).json({ success: true, message: "Entry activated successfully" });
      } else {
        return response.status(400).json({ success: false, message: "Entry could not be activated" });
      }
    });
  });
});
