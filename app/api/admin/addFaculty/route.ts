import dbConnect from "@/lib/dbConnect";
import Faculty from "@/models/faculty";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect(); // Ensure the database connection

    const { name, email, password, department, subject, contactNumber } = await req.json();

    // Validate the required fields
    if (!name || !email || !password || !department || !subject || !contactNumber) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if the faculty already exists by email
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return NextResponse.json(
        { error: "Faculty with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new faculty member
    const newFaculty = new Faculty({
      name,
      email,
      password: hashedPassword,
      department,
      subject,
      contactNumber,
    });

    // Save the faculty member to the database
    await newFaculty.save();

    return NextResponse.json(
      { success: true, message: "Faculty added successfully" },
      { status: 201 }
    );
  } catch (error) {
    // console.error("Error adding faculty:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "An error occurred while adding the faculty",
      },
      { status: 500 }
    );
  }
};
