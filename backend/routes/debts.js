const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();
const router = express.Router();

router.use(authMiddleware);

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
        slug: slug,
      },
      include: { user: true, transactions: { orderBy: { createdAt: "desc" } } },
    });

    if (!debt) {
      return res.status(404).json({ message: "Debt not found" });
    }

    // Add current user id to result
    const debtWithUserID = { ...debt, currentUserId: req.user.id };
    return res.json(debtWithUserID);
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

    // Create a new debt and initial transaction
    const [newDebt, initialTransaction] = await prisma.$transaction([
      prisma.debt.create({
        data: {
          title,
          description,
          amountOwed,
          slug,
          userId: req.user.id,
        },
      }),
      prisma.transaction.create({
        data: {
          debt: {
            connect: { slug: slug },
          },
          amount: amountOwed,
          type: "INCREASE",
          description: "Initial transaction",
        },
      }),
    ]);

    res.status(201).json({ newDebt, initialTransaction });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error creating debt and initial transaction" });
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

    const newAmountOwed =
      type === "INCREASE" ? debt.amountOwed + amount : debt.amountOwed - amount;

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
