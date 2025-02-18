const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// GET: Retrieve all bill shares for a specific bill
router.get("/:billId/billShares", async (req, res) => {
  const { billId } = req.params;

  try {
    const billShares = await prisma.billShare.findMany({
      where: { billId: parseInt(billId) },
      include: {
        user: true, // Include user details
        bill: true, // Include bill details
      },
    });

    if (!billShares.length) {
      return res
        .status(404)
        .json({ error: "No bill shares found for this bill" });
    }

    res.status(200).json(billShares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving bill shares" });
  }
});

// POST: Create a bill share for a specific bill
router.post("/:billId", async (req, res) => {
  const { billId } = req.params; // Get the bill ID from the URL
  const { userId, amount } = req.body; // Get userId and amount from the request body

  // Validate input
  if (!userId || !amount || isNaN(amount) || amount <= 0) {
    return res
      .status(400)
      .json({ error: "Valid userId and positive amount are required" });
  }

  try {
    // Check if the bill exists
    const bill = await prisma.bill.findUnique({
      where: { id: parseInt(billId) },
    });

    if (!bill) {
      return res.status(404).json({ error: "Bill not found" });
    }

    // Check if the user is associated with the bill (via BillUser)
    const isUserInBill = await prisma.billUser.findFirst({
      where: {
        billId: parseInt(billId),
        userId: parseInt(userId),
      },
    });

    if (!isUserInBill) {
      return res
        .status(400)
        .json({ error: "User is not associated with this bill" });
    }

    // Create the BillShare entry
    const newBillShare = await prisma.billShare.create({
      data: {
        userId: parseInt(userId),
        billId: parseInt(billId),
        amount: parseFloat(amount), // Ensure the amount is treated as a float
      },
    });

    res.status(201).json(newBillShare);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating bill share" });
  }
});

// PUT: Update the amount or payment status of a bill share for a specific user
router.put("/:billId/:userId", async (req, res) => {
  const { billId, userId } = req.params; // Get the bill ID and user ID from the URL
  const { amount, status } = req.body; // Get the new amount and/or payment status from the request body

  // Validate the input
  if (amount !== undefined && (isNaN(amount) || amount <= 0)) {
    return res.status(400).json({
      error: "Valid positive amount is required",
    });
  }

  if (
    status !== undefined &&
    !["PENDING", "PAID", "PARTIALLY_PAID"].includes(status)
  ) {
    return res.status(400).json({
      error: "Valid payment status required: PENDING, PAID, or PARTIALLY_PAID",
    });
  }

  try {
    // Check if the bill share exists
    const billShare = await prisma.billShare.findFirst({
      where: {
        billId: parseInt(billId),
        userId: parseInt(userId),
      },
    });

    if (!billShare) {
      return res
        .status(404)
        .json({ error: "Bill share not found for this user and bill" });
    }

    // Update the bill share
    const updatedBillShare = await prisma.billShare.update({
      where: {
        id: billShare.id, // Find the bill share by its ID
      },
      data: {
        ...(amount !== undefined && { amount: parseFloat(amount) }), // Update the amount if provided
        ...(status !== undefined && { status }), // Update the status if provided
      },
    });

    res.status(200).json(updatedBillShare);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating bill share" });
  }
});

// DELETE: Remove a bill share for a specific user and bill
router.delete("/:billId/:userId", async (req, res) => {
  const { billId, userId } = req.params;

  try {
    const billShare = await prisma.billShare.findFirst({
      where: { billId: parseInt(billId), userId: parseInt(userId) },
    });

    if (!billShare) {
      return res
        .status(404)
        .json({ error: "Bill share not found for this user and bill" });
    }

    await prisma.billShare.delete({
      where: { id: billShare.id },
    });

    res.status(200).json({ message: "Bill share deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting bill share" });
  }
});

module.exports = router;
