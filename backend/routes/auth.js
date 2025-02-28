const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

bcrypt.setRandomFallback(() => require("crypto").randomBytes(16));

// POST: Register a new user
router.post("/register", async (req, res) => {
  const { password, userName } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { userName } });
  if (existingUser) return res.status(400).json({ msg: "User already exists" });

  if (!password || typeof password !== "string") {
    return res
      .status(400)
      .json({ msg: "Password is required and must be a string" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(String(password), salt);

  const user = await prisma.user.create({
    data: { password: hashedPassword, userName },
  });

  const payload = { user: { id: user.id } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.json({ token });
});

// POST: Login user
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { userName } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
