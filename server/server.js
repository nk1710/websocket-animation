const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
  let position = 0;
  let animationInterval = null;

  ws.on("message", (message) => {
    if (message.toString() === "start") {
      console.log("Animation started");
      animationInterval = setInterval(() => {
        position += 10; // Move object by 10px
        if (position > 300) position = 0; // Reset position after 300px
        ws.send(position.toString());
      }, 100);
    } else if (message.toString() === "stop") {
      console.log("Animation stopped");
      clearInterval(animationInterval);
    }
  });

  ws.on("close", () => {
    clearInterval(animationInterval);
  });
});

console.log("WebSocket server started on ws://localhost:8080");
