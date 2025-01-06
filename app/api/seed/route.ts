// import { seedAdmins } from "@/lib/seed/seedAdmin";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // await seedAdmins();
        return NextResponse.json({success : true});    
    } catch (error) {
        console.log(error)
        return NextResponse.json({success : false});
    }
}