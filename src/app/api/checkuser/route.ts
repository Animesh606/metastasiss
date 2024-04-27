import connectDB from "@/utils/db.connect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import Team from "@/models/team.model";
import validOrigin from "@/utils/apiRequestOrigin";
export async function POST(req: any, res: any) {
    try {
        // Check if refer from frontend
        if (!validOrigin(req)) {
            return NextResponse.json(
                { message: "Invalid request origin" },
                { status: 401 }
            );
        } 
        
        // Take team details from request formData

        const formData = await req.formData();
        // Get all formaDatas
        const teamName = formData.get("teamName")?.toString();
        const eventName = formData.get("eventName")?.toString();
        const members = formData.get("members")?.toString();
        const userId = formData.get("userId")?.toString();
        if (!teamName || !eventName || !members || !userId ) {
            return NextResponse.json(
                { message: "Field Missing" },
                { status: 400 }
            );
        }
        console.log(teamName);
        console.log(eventName);
        console.log(userId);
        console.log(members);
        // Connect with database
        await connectDB();
        // Find leadUserDetails
        console.log("before call")
        const leadUser = await User.findById(userId)
            // .populate("participations")
            .select("-password -verificationToken -forgetPasswordToken");
         console.log("after call")
            // If leadUser is missing
        if (!leadUser) {
            return NextResponse.json(
                { message: "User is not authenticate" },
                { status: 401 }
            )
        }
      
        // If leadUser already registered for the event
        if (leadUser.participations.some((participation: any) => participation.eventName === eventName)) {
            return NextResponse.json(
                {
                    message: `${leadUser.fullName} is already registered for this event`
                },
                { status: 403 }
            )
        }
        // Parse members
        const memberArray = await JSON.parse(members);

        // Get all members full details
        const userPromises = memberArray.map(async (member: any) => {
            // Get member details
            const user = await User.findOne({
                email: member.email,
                isVerified: true,
            })
                // .populate("participations")
                .select("-password -verificationToken -forgetPasswordToken");

            // If user not exist
            if (!user) {
                throw new Error(`${member.name} is not a verified user`);
            }
        
            // If user already registered for the event
            // if (user.participations.some((participation: any) => participation.eventName === eventName)) {
            //     throw new Error(`${member.name} is already registered for this event`);
            // }
        
            return user;
        });
        let users = [];
        try {
            users = await Promise.all(userPromises);
        } catch (error: any) {
            // Handle errors from individual promises
            return NextResponse.json({ message: error.message }, { status: 403 });
        }
        return NextResponse.json(
            { member:users },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Something Went Wrong.." },
            { status: 500 }
        );
    }
}