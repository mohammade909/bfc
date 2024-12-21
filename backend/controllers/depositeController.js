const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");
const asyncHandler = require("express-async-handler");
const fetchSetRoiFromAdminSettings = require("../utils/settings");
const fs = require('fs');
const path = require('path');
dotenv.config({ path: "backend/config/config.env" });

exports.getListOfDeposite = catchAsyncErrors(async (request, response, next) => {
  let sql = `SELECT user_deposite.*, users.email
FROM user_deposite
LEFT JOIN users ON user_deposite.user_id = users.id;
`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching deposite:", err);
      return next(new ErrorHandler("Error fetching deposite!", 500));
    }
    if (result.length > 0) {
      return response.status(200).json({ alldeposite: result });
    } else {
      return response.status(200).json({ alldeposite: [] });
    }
  });
});
exports.getListOfDepositeById = catchAsyncErrors(async (request, response, next) => {
  const { user_id } = request.params;
  let sql = `SELECT user_deposite.*, users.email
FROM user_deposite
LEFT JOIN users ON user_deposite.user_id = users.id where user_id = '${user_id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching Deposite:", err);
      return next(new ErrorHandler("Error fetching Deposite!", 500));
    }
    if (result.length > 0) {
      return response.status(200).json({ singleDeposite: result });
    } else {
      return response.status(200).json({ singleDeposite: [] });
    }
  });
});

exports.updateDeposite = asyncHandler(async (req, res, next) => {
  const { status, amount, user_id } = req.body;
  const { id } = req.params;

  // Update user_deposite table
  const updateDepositeSql = `UPDATE user_deposite SET status = ?, acceptat = NOW() WHERE id = ?`;
  db.query(updateDepositeSql, [status, id], (err, depositeResult) => {
    if (err) {
      console.error("Error updating user_deposite:", err);
      return next(new ErrorHandler("Error updating user_deposite", 500));
    }
    
    // Check if update was successful
    if (depositeResult.affectedRows === 0) {
      return next(new ErrorHandler("No user_deposite found or no changes applied", 404));
    }

    // If status is 'complete', update the users table business column
    if (status === 'complete') {
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
      res.status(200).json({ success: true, message: "Update successful for user_deposite" });
    }
  });
});


exports.deleteDeposite= asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new ErrorHandler("deposite number (ID) is required", 400));
  }
  const sql = `DELETE FROM user_deposite WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error during deletion:", err);
      return next(new ErrorHandler("Error during deletion", 500));
    }
    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Deletion successful" });
    } else {
      return next(
        new ErrorHandler("user_deposite not found or no changes applied", 404)
      );
    }
  });
});



exports.addDeposite = catchAsyncErrors(async (req, res, next) => {
  let { amount, user_id ,currency,hash} = req.body;
  console.log(req.body)
  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  let uploadedFile = req.files.image;
  const uniqueFilename = `${user_id}_${Date.now()}_${uploadedFile.name}`;
  const uploadDir = path.join(__dirname, '..', '..', 'frontend', 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const uploadPath = path.join(uploadDir, uniqueFilename);
  console.log(uploadPath)
  uploadedFile.mv(uploadPath, function(err) {
    if (err) {
      console.error("Error during file upload:", err);
      return next(new ErrorHandler("Error during file upload", 500));
    }
    const insertTopupSql = `INSERT INTO user_deposite (user_id, amount, image_name , currency,hash) VALUES (?, ?, ?,?,?)`;
    db.query(insertTopupSql, [user_id, amount, uniqueFilename,currency,hash], (err, insertResult) => {
      if (err) {
        console.error("Error inserting into Deposite table:", err);
        return next(new ErrorHandler("Error inserting into Deposite table!", 500));
      }
      if (insertResult.affectedRows > 0) {
        res.status(200).json({ success: true, message: "Deposite request sent successfully" });
      } else {
        res.status(400).json({ error: "Failed to insert into Deposite table" });
      }
    });
  });
});