import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect"; // Ensure this is your correct path
import Faculty from "@/models/faculty"; // Adjust import path accordingly
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/admin";
import Student from "@/models/student";

export const POST = async (req: NextRequest) => {
  await dbConnect(); // Connect to the database

  try {
    const { currentPassword, newPassword, id, role } = await req.json();

    let db: typeof Admin | typeof Student | typeof Faculty | undefined;
    if (role === "admin") db = Admin;
    else if (role === "student") db = Student;
    else if (role === "faculty") db = Faculty;
    if (!db) {
      return NextResponse.json({ error: "Not authorized to do so" }, { status: 400 });
    }
    const user = await db.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 404 });
    }

    const matchedPassword = await bcrypt.compare(currentPassword, user.password);
    if(!matchedPassword) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    if (!user.passwordUpdated) {
      user.passwordUpdated = true;
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    }, { status: 200 });
  } catch (error) {
    // console.error("Error updating password:", error);
    return NextResponse.json({ error: (error as Error).message || "An unexpected error occurred" }, { status: 500 });
  }
}