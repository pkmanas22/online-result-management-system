import dbConnect from "@/lib/dbConnect";
import Exam from "@/models/exam";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect(); // Ensure the database connection

    const { examName, department, subject, totalMarks, date } = await req.json();

    // Validate the required fields
    if (!examName || !department || !subject || !totalMarks || !date) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new exam
    const newExam = new Exam({
      examName,
      department,
      subject,
      totalMarks,
      date,
    });

    // Save the exam to the database
    await newExam.save();

    return NextResponse.json(
      { success: true, message: "Exam added successfully" },
      { status: 201 }
    );
  } catch (error) {
    // console.error("Error adding exam:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "An error occurred while adding the exam",
      },
      { status: 500 }
    );
  }
};
