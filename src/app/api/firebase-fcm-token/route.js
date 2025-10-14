import { NextResponse } from "next/server";
import admin from "firebase-admin";
import serviceAccount from "../../../../serviceAccountKey.json"; // adjust path
import dbConnect from "@/lib/mongodb";
import { storeToken, getToken } from "@/services/FirebaseTokenService";

// Connect to DB
await dbConnect();

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function GET() {
  const token = await getToken();
  // const tokens = token.map(item => item.token);
  // return NextResponse.json(token)
  
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
    console.log("✅ Successfully sent message:", response);

    return NextResponse.json({
      success: true,
      message: "Notification sent successfully!",
      response,
    });
  } catch (error) {
    console.error("❌ Error sending message:", error);

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
