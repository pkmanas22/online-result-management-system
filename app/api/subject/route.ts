import dbConnect from "@/lib/dbConnect";
import Subject from "@/models/subject";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await dbConnect(); // Ensure the database connection

        const { searchParams } = req.nextUrl;
        const department = searchParams.get("department");

        // Validation
        if (!department) {
            return NextResponse.json(
                { error: "Department is required" },
                { status: 400 }
            );
        }

        // Fetch subjects based on the department
        const subjects = await Subject.find({ department });

        if (subjects.length === 0) {
            return NextResponse.json(
                { error: `No subjects found for department: ${department}` },
                { status: 404 }
            );
        }

        const formattedSubjects = subjects.map((subject) => {
            return `${subject.subjectName} - ${subject.subjectCode}`;
        });

        return NextResponse.json(
            { success: true, subjects: formattedSubjects },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: (error as Error).message || "An error occurred while fetching subjects",
            },
            { status: 500 }
        );
    }
};
