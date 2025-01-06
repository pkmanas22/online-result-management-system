import dbConnect from "@/lib/dbConnect";
import Subject from "@/models/subject";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req : NextRequest) => {
  try {
    await dbConnect(); // Ensure the database connection

    const { subjectName, subjectCode, department } = await req.json(); // Parse JSON body

    // Validation
    if (!subjectName || !subjectCode || !department) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new subject
    const newSubject = new Subject({
      subjectName,
      subjectCode,
      department,
    });
    await newSubject.save();

    return NextResponse.json(
      {
        success: true,
        message: "Subject added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "An error occurred while adding the subject"
      },
      { status: 500 }
    );
  }
};