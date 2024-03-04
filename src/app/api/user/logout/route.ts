import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function POST() {
    try {
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