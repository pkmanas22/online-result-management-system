import mongoose from "mongoose";
import { NextResponse } from "next/server";

export default async function dbConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        mongoose.connection.on("connected", () => { console.log("Connected to MongoDB") });

        if (process.env.NODE_ENV === "development") {
            delete mongoose.models.Faculty;
            delete mongoose.models.Admin;
            delete mongoose.models.Student;
            delete mongoose.models.Subject;
            delete mongoose.models.Exam;
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Error connecting to MongoDB");
    }
    return NextResponse.next();
}
