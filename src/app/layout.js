"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((reg) => console.log("Service worker registered.", reg))
          .catch((err) => console.error("SW registration failed:", err));
      });
    }
  }, []);
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
