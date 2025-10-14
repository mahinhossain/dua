// lib/firebase-config.js
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   // apiKey: "YOUR_API_KEY",
//   // authDomain: "YOUR_AUTH_DOMAIN",
//   // projectId: "YOUR_PROJECT_ID",
//   // messagingSenderId: "YOUR_SENDER_ID",
//   // appId: "YOUR_APP_ID",
//   apiKey: "AIzaSyCHouUBkDCnQHT-e_BLEoUyhX85LzDlut8",
//   authDomain: "push-notification-7b0d5.firebaseapp.com",
//   projectId: "push-notification-7b0d5",
//   storageBucket: "push-notification-7b0d5.firebasestorage.app",
//   messagingSenderId: "110594397715",
//   appId: "1:110594397715:web:f6502c73840514963d91e6",
//   measurementId: "G-E9BHVJH2DK",
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const messaging =
//   typeof window !== "undefined" ? getMessaging(firebaseApp) : null;

// export { messaging, getToken, onMessage };

// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCHouUBkDCnQHT-e_BLEoUyhX85LzDlut8",
  authDomain: "push-notification-7b0d5.firebaseapp.com",
  projectId: "push-notification-7b0d5",
  storageBucket: "push-notification-7b0d5.firebasestorage.app",
  messagingSenderId: "110594397715",
  appId: "1:110594397715:web:f6502c73840514963d91e6",
  measurementId: "G-E9BHVJH2DK",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

// Request permission & get token
export async function getFcmToken() {
  try {
    const token = await getToken(messaging, {
      vapidKey: "YOUR_WEB_PUSH_VAPID_KEY",
    });
    console.log( token);
    return token;
  } catch (err) {
    console.error("Error getting FCM token:", err);
    return null;
  }
}

// Handle foreground messages
export function onForegroundMessage(callback) {
  onMessage(messaging, callback);
}
