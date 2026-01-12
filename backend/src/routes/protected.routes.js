const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const router = express.Router();

// USER dashboard
router.get("/dashboard", authenticate, (req, res) => {
  res.status(200).json({
    message: "Welcome to your dashboard",
    user: req.user
  });
});

// ADMIN route
router.get(
  "/admin",
  authenticate,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin"
    });
  }
);

module.exports = router;
