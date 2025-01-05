import dbConnect from "@/lib/dbConnect";
import subject from "@/models/subject";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req : NextRequest) => {
  try {
    await dbConnect(); // Ensure the database connection

    const { subjectName, subjectCode, department } = await req.json(); // Parse JSON body

    // Validation
    if (!subjectName || !subjectCode || !department) {
      return NextResponse.json(
        { subjectError: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if the subject already exists
    const existingSubject = await subject.findOne({ subjectCode });
    if (existingSubject) {
      return NextResponse.json(
        { subjectError: "Given Subject is already added" },
        { status: 400 }
      );
    }

    // Create a new subject
    const newSubject = new subject({
      subjectName,
      subjectCode,
      department,
    });
    await newSubject.save();

    return NextResponse.json(
      {
        success: true,
        message: "Subject added successfully",
        response: newSubject,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        backendError: "An error occurred while adding the subject"
      },
      { status: 500 }
    );
  }
};