import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect"; // Ensure this is your correct path
import Faculty from "@/models/faculty"; // Adjust import path accordingly
import Department from "@/models/department"; // Adjust import path accordingly
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  

  await dbConnect(); // Connect to the database

  try {
    const {
      name,
      email,
      password
    } = await req.json();

    const errors: { emailError?: string } = {};
    const existingFaculty = await Faculty.findOne({ email });

    if (existingFaculty) {
      errors.emailError = "Email already exists";
      return NextResponse.json({ errors }, { status: 400 });
    }

    const faculties = await Faculty.find({ email });
    let helper = faculties.length < 10 
      ? `00${faculties.length}` 
      : faculties.length < 100 
        ? `0${faculties.length}` 
        : faculties.length.toString();

    const hashedPassword = await bcrypt.hash(password, 10);
    const passwordUpdated = false;

    const newFaculty = new Faculty({
      name,
      email,
      password: hashedPassword,
      passwordUpdated,
    });

    await newFaculty.save();

    return NextResponse.json({success : true, message : "Faculty registered successfully", response : newFaculty}, { status: 200 });
     
  } catch (error) {
    console.error("Error registering faculty:", error);
    return NextResponse.json({ backendError: "An unexpected error occurred" }, { status: 500 });
  }
}
