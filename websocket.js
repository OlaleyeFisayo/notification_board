const { WebSocketServer } = require("ws");

function establishWSServer(port) {
  const wsServer = new WebSocketServer({ port: port });
  wsServer.on("connection", (socket) => {
    console.log("WebSocket client connected");
    // socket.on("message", (message) => {
    //   console.log(message);
    //   socket.send(`${message}`);
    // });
  });
  return wsServer;
}

module.exports = { establishWSServer };
