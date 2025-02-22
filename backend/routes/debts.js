const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();
const router = express.Router();

router.use(authMiddleware);

// TODO

// GET: Get debts by current user
router.get("/", async (req, res) => {
  try {
    const debt = await prisma.debt.findMany({
      where: {
        userId: req.user.id,
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

// POST  - Add a transaction and update amountOwed
router.post("/:slug/transactions", async (req, res) => {
  const { slug } = req.params;
  const { amount, type, description } = req.body;
  const userId = req.user.id;

  try {
    const debt = await prisma.debt.findUnique({
      where: { slug },
      include: { user: true },
    });

    if (!debt) return res.status(404).json({ message: "Debt not found" });
    if (debt.userId !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    // Calculate new amountOwed based on transaction type
    const newAmountOwed =
      type === "INCREASE" ? debt.amountOwed + amount : debt.amountOwed - amount;

    // Use transaction to ensure both operations succeed together
    const [transaction, updatedDebt] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          debtId: debt.id,
          amount,
          type,
          description,
        },
      }),
      prisma.debt.update({
        where: { id: debt.id },
        data: { amountOwed: newAmountOwed },
      }),
    ]);

    res.status(201).json({ transaction, updatedDebt });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
