import User from "@/models/user.model";
import connectDB from "@/utils/db.connect";
import sendEmail from "@/utils/mailer";
import { NextRequest, NextResponse } from "next/server";

interface userDetails {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        // Connect database
        await connectDB();

        // Get details from request body
        const { fullName, email, phone, college, password }: userDetails = await req.json();

        // find user exist with phone or email
        const existUser = await User.find({
            $or: [{ email }, { phone }],
        });

        // User already registered
        if (existUser && existUser.length > 0) {
            return NextResponse.json(
                { message: "User already exists." },
                { status: 400 }
            );
        }

        // Create new user and save it to the database
        const user = new User({
            fullName,
            email,
            phone,
            college,
            password
        });

        await user.save();

        // Generate verification token for the newly created user
        const hashedToken = await user.generateVerificationToken();

        // Send email verification mail to user
        await sendEmail("verifyEmail" , {
            email,
            fullName,
            url: `${process.env.DOMAIN_NAME}/verifyEmail?token=${hashedToken}`,
        });

        // Send response back
        return NextResponse.json(
            { message: "User created", user },
            { status: 201 }
        );
    } catch (error) {
        console.log("Error on /api/user", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
