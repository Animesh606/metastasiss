import Team from "@/models/team.model";
import User from "@/models/user.model";
import connectDB from "@/utils/db.connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Connect database
        await connectDB();

        // Get parameters from request
        const { userId, teamId } = await req.json();
        if (!userId || !teamId) {
            return NextResponse.json(
                { message: `Missing parameters` },
                { status: 400 }
            );
        }

        // Find user from database
        const user = await User.findById(userId);

        // If user not found
        if (!user) {
            return NextResponse.json(
                { message: `User not found.` },
                { status: 404 }
            );
        }

        // If user already has voted
        if (user.votedTeam) {
            return NextResponse.json(
                { message: `User already voted` },
                { status: 400 }
            );
        }

        // Find the team
        const team = await Team.findById(teamId);

        // If team not found
        if (!team) {
            return NextResponse.json(
                { message: `Team not found.` },
                { status: 404 }
            );
        }

        // Add vote to user and team and save it in the database
        user.votedTeam = team;
        await user.save();
        team.voteCount = team.voteCount + 1;
        await team.save();

        // Send response with updated data
        return NextResponse.json(
            {
                user,
                message: "Vote casted successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        console.log("Error casting a vote", error);
        return NextResponse.json(
            { message: "Somethig Went Wrong" },
            { status: 500 }
        );
    }
}
