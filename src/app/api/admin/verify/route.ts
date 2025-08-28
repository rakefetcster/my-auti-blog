// src/app/api/admin/verify/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the password from the request body
    const { password } = await request.json();

    // Get the admin password from environment variables (server-side only)
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if environment variable is set
    if (!adminPassword) {
      console.error("ADMIN_PASSWORD environment variable not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Check if password was provided
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Check if password matches
    if (password === adminPassword) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      // Log failed attempts (optional)
      console.log("Failed admin login attempt");
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    console.error("Admin verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
