// public/firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  // apiKey: "YOUR_API_KEY",
  // authDomain: "YOUR_AUTH_DOMAIN",
  // projectId: "YOUR_PROJECT_ID",
  // messagingSenderId: "YOUR_SENDER_ID",
  // appId: "YOUR_APP_ID",
  apiKey: "AIzaSyCHouUBkDCnQHT-e_BLEoUyhX85LzDlut8",
  authDomain: "push-notification-7b0d5.firebaseapp.com",
  projectId: "push-notification-7b0d5",
  storageBucket: "push-notification-7b0d5.firebasestorage.app",
  messagingSenderId: "110594397715",
  appId: "1:110594397715:web:f6502c73840514963d91e6",
  measurementId: "G-E9BHVJH2DK",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
