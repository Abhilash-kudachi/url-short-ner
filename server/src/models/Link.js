const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    target: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Link", linkSchema);
