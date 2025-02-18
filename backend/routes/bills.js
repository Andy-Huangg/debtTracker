const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/authMiddleware");

const prisma = new PrismaClient();
const router = express.Router();

router.use(authMiddleware);

// GET: Get bills created by a specefic user
router.get("/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const bills = await prisma.bill.findMany({
      where: { createdByUserId: userId },
      include: {
        createdBy: true,
        users: true,
        billShares: true,
      },
    });

    res.json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching bills created by user" });
  }
});

// GET: Get bills created by this logged in user
router.get("/", async (req, res) => {
  const userId = req.user.id;

  try {
    const bills = await prisma.bill.findMany({
      where: { createdByUserId: userId },
      include: {
        createdBy: true,
        users: true,
        billShares: true,
      },
    });

    if (!bills || bills.length === 0) {
      return res.status(200).json([]); // Return an empty array if no bills found
    }

    // Ensure the createdByUserId matches the logged-in user's ID
    if (bills[0].createdByUserId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to view these bills" });
    }

    console.log(bills);
    res.json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching bills created by user" });
  }
});

// POST: Create a new bill
router.post("/", async (req, res) => {
  const { title, description, totalAmount, userId } = req.body;

  // Validate the input
  if (!title || !totalAmount || !userId) {
    return res
      .status(400)
      .json({ error: "Title, Total Amount, and User ID are required" });
  }

  try {
    // Create a new bill
    const newBill = await prisma.bill.create({
      data: {
        title,
        description,
        totalAmount,
        createdByUserId: userId, // Associate the bill with a user
      },
    });

    res.status(201).json(newBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating bill" });
  }
});

// POST: Link users to a bill
router.post("/:billId/users", async (req, res) => {
  const { billId } = req.params; // Get the bill ID from the URL
  const { userIds } = req.body; // Get an array of user IDs from the body

  // Validate the input
  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res
      .status(400)
      .json({ error: "You must provide an array of user IDs" });
  }

  try {
    // Link the users to the bill
    const billUsers = await prisma.billUser.createMany({
      data: userIds.map((userId) => ({
        userId,
        billId: parseInt(billId), // Ensure billId is treated as an integer
      })),
    });

    res
      .status(201)
      .json({ message: "Users linked to the bill successfully", billUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error linking users to the bill" });
  }
});

// PUT: Update a bill by ID
router.put("/:billId", authMiddleware, async (req, res) => {
  const billId = parseInt(req.params.billId); // Fixed param case sensitivity
  const { title, description, totalAmount } = req.body;
  const userId = req.user.id; // User ID from the JWT

  try {
    const bill = await prisma.bill.findUnique({
      where: { id: billId },
    });

    if (!bill) return res.status(404).json({ error: "Bill not found" });

    // Check if the current user is the creator of the bill
    if (bill.createdByUserId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this bill" });
    }

    const updatedBill = await prisma.bill.update({
      where: { id: billId },
      data: {
        title,
        description,
        totalAmount,
        updatedAt: new Date(),
      },
    });

    res.json(updatedBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating bill" });
  }
});

module.exports = router;
