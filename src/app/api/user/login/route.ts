import User from "@/models/user.model";
import connectDB from "@/utils/db.connect";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Connect with database
        await connectDB();

        // Get email and password from body
        const { email, password } = await req.json();

        // Find user with email
        const user = await User.findOne({ email, isVerified: true });

        // Check if user is valid
        if (!user || !(await user.isCorrectPassword(password))) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 400 }
            );
        }

        // Create AccessToken
        const accessToken = user.generateAccessToken();

        // Set token to cookies
        cookies().set("access_token", accessToken, { httpOnly: true });

        return NextResponse.json(
            { message: "Logged in successfully!" },
            { status: 201 }
        );
    } catch (error) {
        console.log("Error in api/user/login: ", error);
        return NextResponse.json(
            { message: "Something Went Wrong" },
            { status: 500 }
        );
    }
}
