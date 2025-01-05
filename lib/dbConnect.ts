import mongoose from "mongoose";
import Exam from "@/models/exam"
import { NextResponse } from "next/server";

export default async function dbConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        mongoose.connection.on("connected", () => { console.log("Connected to MongoDB") });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Error connecting to MongoDB");
    }
    const exam = await Exam.create({
        // examname: "mid term",
        // subjectCode: ""
        // department: 
        // totalMarks: 
        // year: 
        // date: 
    })
    return NextResponse.next();
    
}