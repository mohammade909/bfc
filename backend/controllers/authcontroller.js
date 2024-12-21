const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const sendToken = require("../utils/jwtToken");
const asyncHandler = require("express-async-handler");
const fetchSetRoiFromAdminSettings = require("../utils/settings");
const sendAdminToken = require("../utils/adminjwtToken");
const sendMail = require("../utils/mailer");
const dotenv = require("dotenv");
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

dotenv.config({ path: "backend/config/config.env" });

const generateReferralCode = () => {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
};

exports.signup = catchAsyncErrors(async (request, response, next) => {
  const { username, email, password, confirmPassword, referralBy } =
    request.body;
  console.log(request.body);
  const { setregister } = await fetchSetRoiFromAdminSettings();
  if (setregister !== 1) {
    return next(new ErrorHandler("Admin not allowing new registration.", 400));
  }
  if (!username || !email || !password || !confirmPassword) {
    return next(new ErrorHandler("All fields are required.", 400));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match.", 400));
  }
  try {
    const existingUser = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });

    if (existingUser) {
      console.log(existingUser);
      return response
        .status(404)
        .json({ error: "User with this email already exists." });
    }
    const referralCode = generateReferralCode();
    db.beginTransaction(async (transactionErr) => {
      if (transactionErr) {
        console.error("Error starting transaction:", transactionErr);
        return next(new ErrorHandler("Error during signup!", 500));
      }
      try {
        let referringUser;
        if (referralBy) {
          referringUser = await new Promise((resolve, reject) => {
            db.query(
              "SELECT * FROM users WHERE refferal_code = ?",
              [referralBy],
              (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) {
                  return response
                  .status(404)
                  .json({ error: "Invalid referral code." });
                }
                resolve(results[0]);
              }
            );
          });
          await new Promise((resolve, reject) => {
            db.query(
              "UPDATE users SET total_team = total_team + 1 WHERE id = ?",
              [referringUser.id],
              (err, result) => {
                if (err) return reject(err);
                resolve(result);
              }
            );
          });
        }
        const sql = `
          INSERT INTO users (username, email, password, refferal_code${
            referralBy ? ", reffer_by" : ""
          })
          VALUES (?, ?, ?, ?${referralBy ? ", ?" : ""})
        `;
        const values = [username, email, password, referralCode];
        if (referralBy) values.push(referralBy);
        const insertResult = await new Promise((resolve, reject) => {
          db.query(sql, values, (err, result) => {
            if (err) {
              if (err.code === "ER_DUP_ENTRY") {
                return response
                .status(404)
                .json({ error: "User with this email or username already exists." });
              }
              return reject(err);
            }
            sendMail(email,username,password)
            resolve(result);
          });
        });

        if (insertResult.affectedRows > 0) {
          const user = { id: insertResult.insertId, email, username };

          db.commit((commitErr) => {
            if (commitErr) {
              console.error("Error committing transaction:", commitErr);
              return next(new ErrorHandler("Error during signup!", 500));
            }
            return response.status(201).json({ message: `User Created with Email : ${email} and Password : ${password}` });
          });
        } else {
          throw new ErrorHandler("User could not be created", 400);
        }
      } catch (err) {
        db.rollback(() => {
          console.error("Error during signup:", err);
          return next(
            err instanceof ErrorHandler
              ? err
              : new ErrorHandler("Error during signup!", 500)
          );
        });
      }
    });
  } catch (err) {
    return next(new ErrorHandler("Error checking existing email!", 500));
  }
});

exports.adminsignin = catchAsyncErrors(async (request, response, next) => {
  const { email, password } = request.body;

  const table = "users";
  const sql = `SELECT * FROM ${table} WHERE email=? AND password=? AND role='admin';`;

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      return next(new ErrorHandler("Error during login!", 400));
    }
    if (result.length > 0) {
      const admin = result[0];

      // Update last_login column with current date and time
      const updateLastLoginSql = `UPDATE ${table} SET last_login = NOW() WHERE id = ?`;
      db.query(updateLastLoginSql, [admin.id], (updateErr) => {
        if (updateErr) {
          console.error("Error updating last login:", updateErr);
          return next(new ErrorHandler("Error updating last login!", 500));
        }

        sendAdminToken(admin, 201, response);
      });
    } else {
      return response
        .status(404)
        .json({ message: "Admin not found with provided credentials" });
    }
  });
});

exports.signin = catchAsyncErrors(async (request, response, next) => {
  const { email, password } = request.body;
  console.log(request.body);
  const table = "users";
  const sql = `SELECT * FROM ${table} WHERE email=? AND password=? AND role !='admin';`;
  const { setlogin } = await fetchSetRoiFromAdminSettings();

  if (setlogin !== 1) {
    return response
      .status(404)
      .json({ message: "Admin not allowed user login" });
  } else {
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error("Error during login:", err);
        return next(new ErrorHandler("Error during login!", 500));
      }
      if (result.length > 0) {
        const auth = result[0];

        const updateLastLoginSql = `UPDATE ${table} SET last_login = NOW() WHERE id = ?`;
        db.query(updateLastLoginSql, [auth.id], (updateErr) => {
          if (updateErr) {
            console.error("Error updating last login:", updateErr);
            return next(new ErrorHandler("Error updating last login!", 500));
          }

          sendToken(auth, 201, response);
        });
      } else {
        return response
          .status(404)
          .json({ message: "User not found with provided credentials" });
      }
    });
  }
});

exports.signout = catchAsyncErrors(async (request, response, next) => {
  console.log("logout");
  response.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  response.status(200).json({
    success: true,
    message: "Logout successfully !",
  });
});

exports.PasswordChange = catchAsyncErrors(async (request, response, next) => {
  const { email, currentpassword, newpassword } = request.body;
  const sql = `SELECT * FROM users WHERE email=? AND password=?;`;
  db.query(sql, [email, currentpassword], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      return next(new ErrorHandler("Error during login !", 500));
    }
    if (result.length > 0) {
      const sql2 = `update users set password='${newpassword}' WHERE email='${email}' AND password='${currentpassword}';`;
      db.query(sql2, (err, result) => {
        if (err) {
          console.error("Error during password change:", err);
          return next(new ErrorHandler("Error during password change !", 500));
        } else {
          return response
            .status(400)
            .json({ message: "Password change succesfully" });
        }
      });
    } else {
      return response.status(404).json({ message: "password does'nt match" });
    }
  });
});
exports.signoutadmin = catchAsyncErrors(async (request, response, next) => {
  response.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  response.status(200).json({
    success: true,
    message: "Logout successfully !",
  });
});
