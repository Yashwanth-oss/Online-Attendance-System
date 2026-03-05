const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();


// ======================
// REGISTER ADMIN
// ======================
router.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const formattedEmail = email.trim().toLowerCase();

    // Check existing admin
    const existingAdmin = await Admin.findOne({ email: formattedEmail });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email: formattedEmail,
      password: hashedPassword
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ======================
// LOGIN ADMIN
// ======================
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const formattedEmail = email.trim().toLowerCase();

    // Find admin
    const admin = await Admin.findOne({ email: formattedEmail });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Safe JWT
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || "attendance_secret_key",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;