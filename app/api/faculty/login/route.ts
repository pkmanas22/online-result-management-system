import dbConnect from "@/lib/dbConnect";
import faculty from "@/models/faculty";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req : NextRequest) => {
  try {
    await dbConnect(); // Ensure the database connection

    const { username, password } = await req.json(); // Parse JSON body
    const errors = { usernameError: "", passwordError: "" };

    // Check if the faculty exists
    const existingFaculty = await faculty.findOne({ username });
    if (!existingFaculty) {
      errors.usernameError = "Faculty doesn't exist.";
      return NextResponse.json(errors, { status: 404 });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingFaculty.password
    );
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return NextResponse.json(errors, { status: 404 });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: existingFaculty.email,
        id: existingFaculty._id,
      },
      process.env.JWT_SECRET || "sEcReT", // Use environment variable for better security
      { expiresIn: "1h" }
    );

    // Return response
    return NextResponse.json(
      { result: existingFaculty, token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:");
    return NextResponse.json(
      { backendError: "An error occurred during login" },
      { status: 500 }
    );
  }
};