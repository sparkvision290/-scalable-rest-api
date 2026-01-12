const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const seedAdmin = async () => {
  const adminExists = await User.findOne({ role: "ADMIN" });
  if (adminExists) return;

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@system.com",
    password: hashedPassword,
    role: "ADMIN"
  });

  console.log("✅ Admin seeded");
};

module.exports = seedAdmin;