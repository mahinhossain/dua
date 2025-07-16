"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import Head from "next/head";


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
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
