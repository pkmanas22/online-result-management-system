import dbConnect from "@/lib/dbConnect"; // Ensure this is your correct path
import Student from "@/models/student"; // Adjust import path accordingly
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect(); // Connect to the database
    const searchParams = await req.nextUrl.searchParams;
    const rollNo = searchParams.get("rollNo");

    const student = await Student.findOne({ rollNo }).select("name _id");
    if (!student) {
      return NextResponse.json({ error: "No Student Found" }, { status: 404 });
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    // console.error("Error fetching students:", error);
    return NextResponse.json({ error: (error as Error).message || "An unexpected error occurred" }, { status: 500 });
  }
}