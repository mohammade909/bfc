const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const db = require("../config/database");

// Create a notification
exports.createNotification = catchAsyncErrors(async (req, res) => {
  const {
    title,
    message,
    created_by,
    status = "pending",
    type = "info",
    users,
    recipients,
  } = req.body;

  // Start transaction to ensure atomic operation
  await db.promise().beginTransaction();

  try {
    // Insert notification
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO notifications (title, message, created_by, status, type, users) VALUES (?, ?, ?, ?, ?, ?)",
        [title, message, 1, status, type, users ? 1 : 0]
      );

    const notificationId = result.insertId;

    // If `users` is false, add recipients to `notification_recipients` table
    if (!users && recipients && recipients.length > 0) {
      const recipientData = recipients.map((userId) => [
        notificationId,
        userId,
        false,
        null,
      ]);
      await db
        .promise()
        .query(
          "INSERT INTO notification_recipients (notification_id, user_id, seen, seen_at) VALUES ?",
          [recipientData]
        );
    }

    // Commit transaction
    await db.promise().commit();

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notificationId,
    });
  } catch (error) {
    console.log(error);
    
    // Rollback transaction in case of error
    await db.promise().rollback();
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get notifications with optional recipients if `users` is false
exports.getNotifications = catchAsyncErrors(async (req, res) => {
  const [notifications] = await db
    .promise()
    .query("SELECT * FROM notifications ORDER BY created_at DESC");

  // If `users` is false for any notification, fetch recipients
  for (const notification of notifications) {
    if (!notification.users) {
      const [recipients] = await db
        .promise()
        .query(
          `SELECT user_id FROM notification_recipients WHERE notification_id = ?`,
          [notification.id]
        );
      notification.recipients = recipients.map(
        (recipient) => recipient.user_id
      );
    }
  }

  res.status(200).json({ success: true, notifications });
});

exports.getUserNotifications = catchAsyncErrors(async (req, res) => {
  const { userId } = req.params;
  console.log("hello");
  
  // Get notifications that are targeted to all users or specifically to the user
  const [notifications] = await db.promise().query(
    `SELECT n.id, n.title, n.message, n.created_by, n.status, n.type, nr.seen, nr.seen_at, n.created_at
         FROM notifications n
         LEFT JOIN notification_recipients nr ON n.id = nr.notification_id AND nr.user_id = ?
         WHERE n.users = 1 OR nr.user_id = ?
         ORDER BY n.created_at DESC`,
    [userId, userId]
  );

  res.status(200).json({ success: true, notifications });
});

// Update notification seen status for a specific user
exports.updateNotificationSeenStatus = catchAsyncErrors(async (req, res) => {
  const { userId, notificationId } = req.params;

  // Update seen status and seen timestamp for the specific notification and user
  const [result] = await db.promise().query(
    `UPDATE notification_recipients
         SET seen = 1, seen_at = NOW()
         WHERE notification_id = ? AND user_id = ?`,
    [notificationId, userId]
  );

  if (result.affectedRows === 0) {
    return res
      .status(404)
      .json({
        success: false,
        message: "Notification not found or already seen.",
      });
  }

  res.status(200).json({
    success: true,
    message: "Notification marked as seen",
  });
});

exports.deleteNotifications = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(
      new ErrorHandler("notification number (ID) is required", 400)
    );
  }

  const sql = `DELETE FROM notifications WHERE id = ?`;

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
          "notifications not found or no changes applied",
          404
        )
      );
    }
  });
});