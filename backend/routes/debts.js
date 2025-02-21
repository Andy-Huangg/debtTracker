const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();
const router = express.Router();

router.use(authMiddleware);

// TODO

// POST: Create a new debt
router.post("/", async (req, res) => {
  const { title, description, amountOwed } = req.body;

  // Validate the input
  if (!title || !amountOwed) {
    return res.status(400).json({ error: "Title and total Amount not valid" });
  }

  try {
    // Generate slug
    const slug = uuidv4();

    // Create a new debt
    const newDebt = await prisma.debt.create({
      data: {
        title,
        description,
        amountOwed,
        slug,
        userId: req.user.id, // Associate the debt with a user
      },
    });

    res.status(201).json(newDebt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating debt" });
  }
});

// GET: Get debt by slug
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const debt = await prisma.debt.findUnique({
      where: {
        slug: slug, // Find debt by UUID slug
      },
    });

    if (!debt) {
      return res.status(404).json({ message: "Debt not found" });
    }

    return res.json(debt);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
