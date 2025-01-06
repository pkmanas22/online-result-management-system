import {NextRequest, NextResponse} from "next/server";
import Student from "@/models/student";
export async function GET(req : NextRequest) {
    const id = req.nextUrl.searchParams.get("id");
    if(!id) {
        return NextResponse.json({
            success : false,
            msg : "No user id found"
        })
    }
    const user = await Student.findById(id);
    if(!user){
        return NextResponse.json({
            success : false,
            msg : "user not found"
        }, {status : 404})
    }
    return NextResponse.json({
        success : true,
        name : user.name
    })
}