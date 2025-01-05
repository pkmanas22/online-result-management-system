import dbConnect from "@/lib/dbConnect"; // Ensure this is your correct path
import Exam from "@/models/exam"; // Adjust import path accordingly
import Student from "@/models/student"; // Adjust import path accordingly
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect(); // Connect to the database

  try {
    const { subjectCode, department, year, section, date, examname, totalMarks } = await req.json();
    const errors: { testError?: string } = {};

    // Checking if the exam already exists
    const existingExam = await Exam.findOne({
      subjectCode,
      department,
      year,
      section,
      examname,
    });

    if (existingExam) {
      errors.testError = "The exam has already been created";
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Creating the new exam
    const newExam = new Exam({
      subjectCode,
      department,
      year,
      section,
      date,
      examname,
      totalMarks,
    });

    await newExam.save();

    // You can fetch the students for this exam if needed
    const students = await Student.find({ department, year, section });

    return NextResponse.json({
      success: true,
      message: "Exam added successfully",
      response: newExam,
    }, { status: 200 });

  } catch (error) {
    console.error("Error creating exam:", error);
    return NextResponse.json({ backendError: "An unexpected error occurred" }, { status: 500 });
  }
}