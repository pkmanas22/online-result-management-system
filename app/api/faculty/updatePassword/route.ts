import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect"; // Ensure this is your correct path
import Faculty from "@/models/faculty"; // Adjust import path accordingly
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect(); // Connect to the database

  try {
    const { currentPassword, newPassword, id } = await req.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const errors: { mismatchError?: string } = {};

    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
    }

    const mathch = await bcrypt.compare(currentPassword, faculty.password);
    if(!mathch) {
      alert("Wrong password");
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    faculty.password = hashedPassword;

    if (!faculty.passwordUpdated) {
      faculty.passwordUpdated = true;
    }

    await faculty.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
      response: faculty,
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ backendError: "An unexpected error occurred" }, { status: 500 });
  }
}