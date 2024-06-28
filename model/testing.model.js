const { Schema, model } = require("mongoose");

const TestingSchema = new Schema({
  message: {
    type: String,
    required: [true, "You need to send a message"],
    trim: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = model("Testing", TestingSchema);
