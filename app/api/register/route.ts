import dbConnect from "@/lib/dbConnect";
import Student from "@/models/student";
import Faculty from "@/models/faculty";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Admin from "@/models/admin";

export const POST = async (req: NextRequest) => {
    try {
        await dbConnect(); // Ensure the database connection

        // Parse the request body
        const {
            name,
            email,
            rollNo,
            password,
            year,
            department,
            contactNumber,
        } = await req.json();

        // Validate the required fields
        if (!name || !email || !rollNo || !password || !year || !department) {
            return NextResponse.json(
                { error: "All required fields must be filled" },
                { status: 400 }
            );
        }

        const existingUser = await Student.findOne({ email })
            || await Admin.findOne({ email })
            || await Faculty.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "This email id is already registered" },
                { status: 409 }
            );
        }

        // Check for duplicate roll number (only for Student model)
        const existingStudent = await Student.findOne({ rollNo });
        if (existingStudent) {
            return NextResponse.json(
                { error: "Roll Number already exists" },
                { status: 409 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student
        const newStudent = new Student({
            name,
            email,
            rollNo,
            password: hashedPassword,
            year,
            department,
            contactNumber,
        });

        // Save the student to the database
        await newStudent.save();

        return NextResponse.json(
            { success: true, message: "Student registered successfully" },
            { status: 201 }
        );
    } catch (error) {
        // console.error("Error registering student:", error);
        return NextResponse.json(
            {
                success: false,
                error: (error as Error).message || "An error occurred while registering the student",
            },
            { status: 500 }
        );
    }
};
