import User from "@/models/user.model";
import connectDB from "@/utils/db.connect";
import sendEmail from "@/utils/mailer";
import validOrigin from "@/utils/apiRequestOrigin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

        // Get token from request
        const { token } = await req.json();

        // Find user with the token
        const user = await User.findOne({
            verificationToken: { $exists: true, $eq: token },
        });

        // In case no user found in database
        if (!user) {
            return NextResponse.json(
                { message: "Invalid Token" },
                { status: 400 }
            );
        }

        // Verify the user
        await user.verifyUser();

        // Send Registration Successful mail
        await sendEmail("userRegistration", {
            email: user.email,
            fullName: user.fullName,
        });

        return NextResponse.json(
            { message: "Email Verified Successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error on /api/user/verifyEmail", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
