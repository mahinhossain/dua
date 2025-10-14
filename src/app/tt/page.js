// pages/index.js
"use client";
// pages/index.js
import { useEffect, useState } from "react";
import { initiateSocket } from "../../util/socket";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/api/socket"); // Ensures server starts
    const s = initiateSocket();

    s.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, { from: "other", text: msg }]);
    });

    setSocket(s);
    s.on("connect", () => {
      console.log("Connected to server");
    });

    s.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    return () => {
      s.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "me", text: input }]);
    socket.emit("send-message", input);
    setInput("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="h-96 border p-4 overflow-y-scroll mb-4 rounded">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 ${m.from === "me" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-3 py-1 rounded ${
                m.from === "me" ? "bg-blue-300" : "bg-gray-300"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-grow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
