import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect"; // Ensure this is your correct path
import Student from "@/models/student"; // Adjust import path accordingly
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect(); // Connect to the database

  try {
    const { username, password } = await req.json();
    const errors: { usernameError?: string; passwordError?: string } = {};

    const existingStudent = await Student.findOne({ username });
    if (!existingStudent) {
      errors.usernameError = "Student doesn't exist.";
      return NextResponse.json({ errors }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingStudent.password);
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return NextResponse.json({ errors }, { status: 404 });
    }

    const token = jwt.sign(
      {
        email: existingStudent.email,
        id: existingStudent._id,
      },
      "sEcReT",
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      result: existingStudent,
      token: token,
    }, { status: 200 });
  } catch (error) {
    console.error("Error during student login:", error);
    return NextResponse.json({ backendError: "An unexpected error occurred" }, { status: 500 });
  }
}
