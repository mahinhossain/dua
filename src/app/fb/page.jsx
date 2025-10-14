"use client";

import { useEffect } from "react";
import { messaging } from "../../../lib/firebaseConfig";
import { onMessage } from "firebase/messaging";

const HomePage = () => {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);
      // You can trigger a toast, modal, or in-app UI here
      // alert(payload.notification.title);
    });

    // Optional cleanup
    return () => {
      unsubscribe(); // This removes the listener when the component unmounts
    };
  }, []);

  // useEffect(() => {
  //   onMessage(messaging, handleForegroundMessage);
  // }, []);

  return <h1>Hello</h1>;
};

export default HomePage;
