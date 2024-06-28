require("dotenv").config();
require("express-async-errors");
const express = require("express");
const { consumeMessages } = require("./mq/consumer");
const { establishWSServer } = require("./websocket");
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const connectDB = require("./db/connect");
const route = require("./routes/testing.route");

const app = express();
const port = process.env.PORT || 3000;
const wsPort = process.env.WSPORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/testing", route);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Websocket
const wsServer = establishWSServer(wsPort);

//Server
(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    // consumeMessages(wsServer);
  } catch (error) {
    console.error(error);
  }
})();
