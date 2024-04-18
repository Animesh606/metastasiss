import connectDB from "@/utils/db.connect";
import { NextRequest, NextResponse } from "next/server";
import Team from "@/models/team.model";
import validOrigin from "@/utils/apiRequestOrigin";
import sendEmail from "@/utils/mailer";
export async function POST(req:any) {
    try {
     
        // Check if refer from frontend
        if(!validOrigin(req)) {
            return NextResponse.json(
                { message: "Invalid request origin" },
                { status: 401 }
            );
        }
       
        // Take the link
        const {teamId,submission,submittedBy}=await req.json();
        console.log(teamId,submission,submittedBy)
        if (!submission ) {
            return NextResponse.json(
                { message: "Field Missing" },
                { status: 400 }
            );
        }
        // Connect with database
        await connectDB();

        // Find leadUserDetails
        const team = await Team.findById(teamId).populate("members","email , fullName").populate("leaderDetails","email , fullName")
        .select("-password -verificationToken -forgetPasswordToken  ");
        if (!team) {
            return NextResponse.json(
                { message: "Team is not authenticate" },
                { status: 401 }
            );
        }
        // console.log(team)
        team.submission=submission;
        await team.save();
        let idOfMembers = <any[]>[];
         idOfMembers=team.members;
         idOfMembers.unshift(team.leaderDetails);
         console.log(idOfMembers)
       
        for(let i = 0; i < idOfMembers.length; i++) {
            await sendEmail("eventSubmition", {
                email: idOfMembers[i].email,
                fullName: idOfMembers[i].fullName,
                teamName: team.teamName,
                eventName: team.eventName,
                sumittedBy: submittedBy,
                link: submission
            });
        }

        return NextResponse.json(
            { message: "Submission successfull" },
            { status: 201 }
        );
    } catch (error) {
    
        return NextResponse.json(
            { message: "Something Went Wrong.." },
            { status: 500 }
        );
    }
}