import admin from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {

    try {
        const { username, password } = await req.json();
        const existingAdmin = await admin.findOne({ username });
        if (!existingAdmin) {
            return NextResponse.json({ msg: "Admin doesn't exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingAdmin.password
        );
        // console.log(isPasswordCorrect);
        if (!isPasswordCorrect) {
            return NextResponse.json({ msg: "Invalid details" });
        }
        // console.log("Hello");
        const token = jwt.sign(
            {
                id: existingAdmin._id,
            },
            "sEcReT",
            { expiresIn: "1h" }
        );
        console.log(existingAdmin);
        NextResponse.json({ result: existingAdmin, token });
    } catch (error) {
        console.log(error);
    }
};