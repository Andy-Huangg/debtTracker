const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

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

module.exports = router;
