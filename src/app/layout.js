"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import Head from "next/head";

import { messaging } from "../../lib/firebaseConfig";
import { getToken } from "firebase/messaging";
import axios from "axios";
export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((reg) => console.log("Service worker registered.", reg))
          .catch((err) => console.error("SW registration failed:", err));
      });
    }

    // Request permission for push notifications
    const requestPermission = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey:process.env.KEY_PAIR,
        });
        console.log(token);
        if (token) {
          const res = await axios.post("/api/firebase-fcm-token", { token });
          console.log("res :>> ", res);
        }
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    if (typeof window !== "undefined") {
      requestPermission();
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
