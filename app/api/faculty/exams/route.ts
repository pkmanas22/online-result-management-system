import Exam from "@/models/exam";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = await req.nextUrl.searchParams;
        const department = searchParams.get("department");
        const subject = searchParams.get("subject");

        const exams = await Exam.find({ department, subject });

        if (!exams) {
            return NextResponse.json({ error: "No exams found" }, { status: 404 });
        }

        return NextResponse.json({ exams }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
    }
}