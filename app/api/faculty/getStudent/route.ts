import dbConnect from "@/lib/dbConnect"; // Ensure this is your correct path
import Student from "@/models/student"; // Adjust import path accordingly
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect(); // Connect to the database

  try {
    const { department, year, section } = await req.json();
    const errors: { noStudentError?: string } = {};

    const students = await Student.find({ department, year, section });
    if (students.length === 0) {
      errors.noStudentError = "No Student Found";
      return NextResponse.json({ errors }, { status: 404 });
    }

    return NextResponse.json({ result: students }, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ backendError: "An unexpected error occurred" }, { status: 500 });
  }
}