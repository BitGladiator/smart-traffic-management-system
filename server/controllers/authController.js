const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.register = async (req, res) => {
  console.log("=== REGISTER ENDPOINT HIT ===");
  console.log("Request body:", req.body);

  try {
    const errors = validationResult(req);
    console.log("Validation errors:", errors.array());

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;
    console.log("Parsed data:", { name, email, password, role });

    console.log("Checking for existing user with email:", email);
    const existingUser = await User.findOne({ email });
    console.log("Existing user result:", existingUser);

    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed");

    // Create user
    console.log("Creating user object...");
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "operator",
    });

    console.log("User object before save:", user);

    await user.save();
    console.log("User saved successfully. ID:", user._id);

    console.log("Creating JWT token...");
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("Token created");
    const subscription = await require("../models/Subscription").findOne({
      userId: user._id,
      status: { $in: ["trial", "active"] },
    });
    res.status(201).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasActiveSubscription: !!subscription,
        subscriptionPlan: subscription ? subscription.planName : null,
        subscriptionStatus: subscription ? subscription.status : "none",
      },
    });

    console.log("=== REGISTER SUCCESS ===");
  } catch (error) {
    console.error("=== REGISTER ERROR ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Full error object:", error);

    if (error.name === "ValidationError") {
      console.error("Mongoose validation error:", error.errors);
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    if (error.code === 11000) {
      console.error("Duplicate key error (email already exists)");
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const errorResponse = {
      message: "Server error",
      ...(process.env.NODE_ENV === "development" && {
        error: error.message,
        stack: error.stack,
      }),
    };

    res.status(500).json(errorResponse);
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    const subscription = await require("../models/Subscription").findOne({
      userId: user._id,
      status: { $in: ["trial", "active"] },
    });
    res.json({
      message: "Login successful", // or 'User registered successfully'
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasActiveSubscription: !!subscription,
        subscriptionPlan: subscription ? subscription.planName : null,
        subscriptionStatus: subscription ? subscription.status : "none",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
