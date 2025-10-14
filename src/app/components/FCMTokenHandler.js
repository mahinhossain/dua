// components/FCMTokenHandler.js
import { useEffect, useState } from "react";
import { messaging } from "@/lib/firebaseConfig";
import { getToken } from "firebase/messaging";

const vapidKey = "YOUR_VAPID_KEY"; // from Firebase Console > Cloud Messaging > Web Push certificates

export default function FCMTokenHandler() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!messaging || !("Notification" in window)) return;

    // Ask for permission to send notifications
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // Get FCM Token
        getToken(messaging, { vapidKey })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token-:", currentToken);
              setToken(currentToken);
              // 👉 send currentToken to your backend to store
            } else {
              console.log("No registration token available.");
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token.", err);
          });
      } else {
        console.log("Notification permission denied.");
      }
    });
  }, []);

  return null; // or return token if you want to display it
}
