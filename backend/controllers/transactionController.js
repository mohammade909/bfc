const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");
const asyncHandler = require("express-async-handler");
dotenv.config({ path: "backend/config/config.env" });

exports.getTransaction = catchAsyncErrors(async (request, response, next) => {
  console.log("ok")
    const {table_name} =request.body
    let sql = `
    SELECT ${table_name}.*, users.email 
    FROM ${table_name} 
    LEFT JOIN users ON ${table_name}.user_id = users.id;
  `;
    db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching Deposite:", err);
      return next(new ErrorHandler("Error fetching Deposite!", 500));
    }
    if (result.length > 0) {
      return response.status(200).json({ alltransaction: result });
    } else {
      return response.status(200).json({ alltransaction: [] });
    }
  });
});

exports.getTransactionById = catchAsyncErrors(async (request, response, next) => {
  const user_id = request.params.user_id;
  const table_name = request.body.table_name;
  // Validate table_name if it comes from the request to avoid potential security risks
  // SQL query with parameterized values
  let sql;
  if(table_name =='direct_transaction' || table_name =='invest_level_transaction'){
sql = `SELECT ??.*, users.email 
             FROM ?? 
             LEFT JOIN users ON ??.userby_id = users.id 
             WHERE ??.user_id = ?`;}

    else if(table_name =='roi_transaction'  || table_name =='reward_transaction'){
              sql = `SELECT ??.*, users.email 
      FROM ?? 
      LEFT JOIN users ON ??.user_id = users.id 
      WHERE ??.user_id = ?`;
            }

    else{
      sql = `SELECT ??.*, users.email 
      FROM ?? 
      LEFT JOIN users ON ??.user_id = users.id 
      WHERE users.id = ?`;
    }

  // Execute the query safely with parameterized inputs
  db.query(sql, [table_name, table_name, table_name, table_name, user_id], (err, result) => {
    if (err) {
      console.error("Error fetching transaction:", err);
      return next(new ErrorHandler("Error fetching transaction!", 500));
    }
    if (result.length > 0) {
      return response.status(200).json({ transaction: result });
    } else {
      return response.status(200).json({ transaction: [] });
    }
  });
});
