import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});



/* ===========================
   CREATE USER
=========================== */
app.post("/create-user", async (req, res) => {
  const { id, name, email } = req.body;

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        id,
        name,
        email,
        streak: 0,
        bestStreak: 0,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User creation failed" });
  }
});



/* ===========================
   GET PROFILE
=========================== */
app.get("/profile/:email", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.params.email },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Profile fetch failed" });
  }
});



/* ===========================
   GET STREAK
=========================== */
app.get("/streak/:email", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.params.email },
    });

    res.json({ streak: user?.streak || 0 });
  } catch (error) {
    res.status(500).json({ error: "Streak fetch failed" });
  }
});



/* ===========================
   SAVE RESULT (UPDATE STREAK)
=========================== */
app.post("/save-result", async (req, res) => {
  const { email, won } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let newStreak = won ? user.streak + 1 : 0;
    let bestStreak = Math.max(user.bestStreak, newStreak);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        streak: newStreak,
        bestStreak: bestStreak,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Save result failed" });
  }
});



/* ===========================
   LEADERBOARD
=========================== */
app.get("/leaderboard", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { streak: "desc" },
      take: 10,
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Leaderboard fetch failed" });
  }
});



app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});
