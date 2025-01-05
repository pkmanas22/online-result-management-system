import dbConnect from "@/lib/dbConnect"; // Ensure this is your correct path
import Student from "@/models/student"; // Adjust import path accordingly
import Test from "@/models/exam"; // Adjust import path accordingly
import Subject from "@/models/subject"; // Adjust import path accordingly
import Marks from "@/models/marks"; // Adjust import path accordingly
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect(); // Connect to the database

  try {
    const { department, year, section } = await req.json();
    const errors: { notestError?: string } = {};

    const student = await Student.findOne({ department, year, section });
    if (!student) {
      errors.notestError = "No student found in the specified department, year, and section.";
      return NextResponse.json({ errors }, { status: 404 });
    }

    const tests = await Test.find({ department, year, section });
    if (tests.length === 0) {
      errors.notestError = "No Test Found";
      return NextResponse.json({ errors }, { status: 404 });
    }

    const result = [];
    for (const test of tests) {
      const subject = await Subject.findOne({ subjectCode: test.subjectCode });
      const marks = await Marks.findOne({
        student: student._id,
        exam: test._id,
      });

      if (marks) {
        result.push({
          marks: marks.marks,
          totalMarks: test.totalMarks,
          subjectName: subject?.subjectName,
          subjectCode: test.subjectCode,
          test: test.examname,
        });
      }
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching test results:", error);
    return NextResponse.json({ backendError: "An unexpected error occurred" }, { status: 500 });
  }
}
