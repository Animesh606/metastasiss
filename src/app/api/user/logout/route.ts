import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import validOrigin from "@/utils/apiRequestOrigin";

export function POST(req: NextRequest) {
    try {
        // Check if refer from frontend
        if(!validOrigin(req)) {
            return NextResponse.json(
                { message: "Invalid request origin" },
                { status: 401 }
            );
        }

        // Delete accessToken from cookie
        cookies().delete("access_token");

        return NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error occurred while logging out" },
            { status: 500 }
        );
    }
}