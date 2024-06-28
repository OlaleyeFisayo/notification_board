const amqp = require("amqplib");
const { WebSocket } = require("ws");
const { postMessage } = require("../controllers/testing.controller");

async function consumeMessages(wsServer) {
  try {
    const url = process.env.URL;
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    const exchangeName = process.env.EXCHANGE;
    await channel.assertExchange(exchangeName, "direct", {
      durable: false,
    });

    const q = await channel.assertQueue("InfoQueue", {
      durable: false,
    });

    await channel.bindQueue(q.queue, exchangeName, "Info");

    console.log("waiting to consume Messages");
    channel.consume(q.queue, async (msg) => {
      const data = msg.content.toString("utf8");
      await wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      await postMessage(data);
      channel.ack(msg);
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  consumeMessages,
};
