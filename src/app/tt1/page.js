// pages/index.js
"use client";
import React, { useEffect, useState } from "react";
import { initiateSocket } from "../../util/socket";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/socket"); // ensure socket server is started
    const s = initiateSocket();

    s.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, { from: "other", text: msg }]);
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);
  console.log("messages", messages);
  const handleSend = () => {
    if (message.trim() !== "") {
      setMessages((prev) => [...prev, { from: "me", text: message }]);
      socket.emit("send-message", message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="border p-4 h-96 overflow-y-scroll mb-4 rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${msg.from === "me" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-2 py-1 rounded ${
                msg.from === "me" ? "bg-blue-200" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 flex-grow rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
