import Mark from "@/models/marks"; // already imported
import Exam from "@/models/exam";   // Add this import for Exam model
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
        }

        await dbConnect();

        // Fetch marks based on studentId
        const marks = await Mark.find({ studentId: id });

        if (!marks || marks.length === 0) {
            return NextResponse.json({ error: "No exam marks found" }, { status: 404 });
        }

        // Fetch associated exams for the marks
        const examIds = marks.map(mark => mark.examId);
        const exams = await Exam.find({ _id: { $in: examIds } });

        // Create a map for quick lookup of exam details by examId
        const examMap = exams.reduce((acc, exam) => {
            acc[exam._id.toString()] = exam;
            return acc;
        }, {} as Record<string, typeof Exam>);

        // Attach exam details to each mark
        const marksWithExamDetails = marks.map(mark => ({
            ...mark.toObject(),
            examDetails: examMap[mark.examId.toString()] || null
        }));

        return NextResponse.json({ marks: marksWithExamDetails }, { status: 200 });
    } catch (error) {
        // console.log(error);
        return NextResponse.json({ error: (error as Error).message || "Something went wrong" }, { status: 500 });
    }
}
