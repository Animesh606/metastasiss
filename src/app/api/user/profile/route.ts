import User from "@/models/user.model";
import validOrigin from "@/utils/apiRequestOrigin";
import connectDB from "@/utils/db.connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Check if refer from frontend
        if(!validOrigin(req)) {
            return NextResponse.json(
                { message: "Invalid request origin" },
                { status: 401 }
            );
        }
        
        // Connect with database
        await connectDB();

        const queries = req.nextUrl.searchParams;

        // Get userId from request and find user
        const user = await User.findById(queries.get("userId")).select("-password -verificationToken -forgotPasswordToken");

        // No user found
        if(!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "User found", user },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Something Went Wrong" },
            { status: 500 }
        );
    }
}