const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const billsRouter = require("./routes/bills");
const billSharesRouter = require("./routes/billShares");
const authRouter = require("./routes/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/api/bills", billsRouter);
app.use("/api/billShares", billSharesRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
