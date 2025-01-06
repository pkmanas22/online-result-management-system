import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/admin";
import Faculty from "@/models/faculty";
import Student from "@/models/student";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        const { id, role } = await req.json();
        await dbConnect();

        let db: typeof Admin | typeof Student | typeof Faculty | undefined;
        if (role === "admin") db = Admin;
        else if (role === "student") db = Student;
        else if (role === "faculty") db = Faculty;
        if (!db) {
            return NextResponse.json({ error: "Not authorized to do so" }, { status: 400 });
        }

        const user = await db.findById(id)
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message || "Something went wrong" }, { status: 500 });
    }
}