import dbConnect from "@/lib/dbConnect"; // Ensure this is your correct path
import Mark from "@/models/marks"; // Adjust import path accordingly
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect(); // Connect to the database

    const body = await req.json();
    const { examId, studentId, securedMarks } = body;

    // Validate input
    if (!examId || !studentId || securedMarks === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create or update mark entry
    const existingMark = await Mark.findOne({ examId, studentId });

    if (existingMark) {
      // Update marks if record already exists
      existingMark.securedMarks = securedMarks;
      await existingMark.save();
    } else {
      // Create a new record if none exists
      const newMark = new Mark({
        examId,
        studentId,
        securedMarks,
      });
      await newMark.save();
    }

    return NextResponse.json(
      { message: "Marks uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error uploading marks:", error);
    return NextResponse.json(
      { error: (error as Error).message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
};
