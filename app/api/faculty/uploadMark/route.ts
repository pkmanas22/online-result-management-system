import dbConnect from "@/lib/dbConnect"; // Ensure this is your correct path
import Marks from "@/models/marks"; // Adjust import path accordingly
import Exam from "@/models/exam"; // Assuming "exam" model is used to define the exam structure
import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/student";

export const POST = async (req: NextRequest) => {
  await dbConnect(); // Connect to the database

  try {
    const { rollNo, studentName, selectedExam, securedMarks, } = await req.json();
    const errors: { examError?: string } = {};

    // Fetching the exam document using the provided exam name
    const existingExam = await Exam.findOne({
      selectedExam
    });

    if (!existingExam) {
      errors.examError = "Exam not found";
      return NextResponse.json({ errors }, { status: 404 });
    }

    // Checking if marks are already uploaded for the current exam
    const isAlready = await Marks.find({ exam: existingExam._id });

    if (isAlready.length !== 0) {
      errors.examError = "Marks have already been uploaded for this exam";
      return NextResponse.json({ errors }, { status: 400 });
    }

    const student = await Student.findOne({ rollNo });
    // Uploading mark
      const newMarks = new Marks({
        student: student._id,
        exam: selectedExam,
        marks: securedMarks,
      });
      await newMarks.save();

    return NextResponse.json({
      message: "Marks uploaded successfully",
    }, { status: 200 });

  } catch (error) {
    console.error("Error uploading marks:", error);
    return NextResponse.json({ backendError: "An unexpected error occurred" }, { status: 500 });
  }
}