const express = require("express");
const router = express.Router();
const Link = require("../models/Link");

// CREATE SHORT URL
router.post("/", async (req, res) => {
  try {
    const { target, code } = req.body;

    if (!target) {
      return res.status(400).json({ error: "Target URL required" });
    }

    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(target)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    let finalCode = code;
    if (!finalCode) {
      finalCode = Math.random().toString(36).substring(2, 8);
    }

    const exists = await Link.findOne({ code: finalCode });
    if (exists) return res.status(409).json({ error: "Code already exists" });

    const link = await Link.create({
      target,
      code: finalCode,
      clicks: 0,
      deleted: false,
    });

    return res.status(201).json(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET ALL LINKS
router.get("/", async (req, res) => {
  const links = await Link.find({ deleted: false }).sort({ createdAt: -1 });
  res.json(links);
});

// GET SINGLE LINK
router.get("/:code", async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });
  if (!link) return res.status(404).json({ error: "Not found" });
  res.json(link);
});

// DELETE LINK
router.delete("/:code", async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });
  if (!link) return res.status(404).json({ error: "Not found" });

  link.deleted = true;
  await link.save();

  res.json({ success: true });
});

module.exports = router;
