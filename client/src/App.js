import React, { useEffect, useState } from "react";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [position, setPosition] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (event) => {
      setPosition(parseFloat(event.data)); // Update animation position
    };

    ws.onclose = () => console.log("WebSocket closed");
    return () => ws.close();
  }, []);

  const startAnimation = () => {
    if (socket) {
      socket.send("start");
      setIsRunning(true);
    }
  };

  const stopAnimation = () => {
    if (socket) {
      socket.send("stop");
      setIsRunning(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>WebSocket Animation</h1>
      <button onClick={startAnimation} disabled={isRunning}>
        Start Animation
      </button>
      <button onClick={stopAnimation} disabled={!isRunning}>
        Stop Animation
      </button>
      <div
        style={{
          marginTop: "50px",
          width: "50px",
          height: "50px",
          backgroundColor: "blue",
          position: "relative",
          left: `${position}px`,
          transition: "left 0.1s linear",
        }}
      ></div>
    </div>
  );
};

export default App;
