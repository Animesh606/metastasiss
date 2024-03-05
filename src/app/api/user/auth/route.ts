import verifyJWT from "@/utils/auth";
import { NextResponse } from "next/server";

export function GET() {
    try {
        const token = verifyJWT();
        return NextResponse.json(
            { message: "User Found", user: token },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
}