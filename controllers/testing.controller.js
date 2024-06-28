const Testing = require("../model/testing.model");

const postMessage = async (data) => {
  await Testing.create({
    message: data,
  });
  res.status(201).json({
    successful: true,
    msg: "Message sent to server",
  });
};

const getAllMessages = async (req, res) => {
  const messages = await Testing.find({});
  res.status(200).json({ data: messages });
};

module.exports = { postMessage, getAllMessages };
