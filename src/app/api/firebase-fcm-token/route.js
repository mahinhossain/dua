import { NextResponse } from "next/server";
import admin from "firebase-admin";
import dbConnect from "@/lib/mongodb";
import { storeToken, getToken } from "@/services/FirebaseTokenService";

// Connect to DB
await dbConnect();

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function GET() {
  // return NextResponse.json(dd )
  const token = await getToken();

  const message = {
    token: token,
    notification: {
      title: "Test Notification",
      body: "This is a push notification from Next.js",
    },
    webpush: {
      headers: {
        Urgency: "high",
      },
      fcmOptions: {
        link: "http://localhost:3000/", // optional click action
      },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log(" Successfully sent message:", response);

    return NextResponse.json({
      success: true,
      message: "Notification sent successfully!",
      response,
    });
  } catch (error) {
    console.error("Error sending message:", error);

    return NextResponse.json({
      success: false,
      message: "Failed to send notification",
      error: error.message,
    });
  }
}

export async function POST(request) {
  try {
    const token = await request.json();
    const res = await storeToken(token);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
