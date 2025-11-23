require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const linksRoute = require("./routes/links");

const app = express();

// MUST BE FIRST
app.use(
  cors({
    origin: ["http://localhost:5173", "https://url-short-ner-1.onrender.com"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
  })
);

// MUST BE SECOND
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// connect
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err));

app.get("/healthz", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.use("/api/links", linksRoute);

const Link = require("./models/Link");

app.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const link = await Link.findOne({ code });

    if (!link) return res.status(404).send("Not Found");

    link.clicks += 1;
    link.lastClicked = new Date();
    await link.save();

    return res.redirect(link.target);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));