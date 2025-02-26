const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const authRouter = require("./routes/auth");
const debtsRouter = require("./routes/debts");
require("dotenv").config();

const app = express();
const PORT = process.env.PGPORT || 5000;
const prisma = new PrismaClient();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/api/debts", debtsRouter);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
