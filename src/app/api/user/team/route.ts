import Team from "@/models/team.model";
import User from "@/models/user.model";
import validOrigin from "@/utils/apiRequestOrigin";
import connectDB from "@/utils/db.connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        // Check if refer from frontend
        if (!validOrigin(req)) {
            return NextResponse.json(
                { message: "Invalid request origin" },
                { status: 401 }
            );
        }
        // Connect with database
        await connectDB();
       

        // Get userId from request and find user
        const { team, submission } = await req.json();
       
        
        if (team) {
            for (let i = 0; i < team.length; i++) {
                try {
                    const tem = await Team.findOne({ _id: team[i] });
                    if (tem?.eventName === "Gaming competition") {
                        const responseData = {
                            _id: tem._id,
                            teamName: tem.teamName,
                            leaderDetails: tem.leaderDetails,
                        };
                        return NextResponse.json(
                            { message: "Team found", responseData },
                            { status: 200 }
                        );

                    }
                } catch (error: any) {
                    return NextResponse.json(
                        { message: "Something Went Wrong" },
                        { status: 500 }
                    );
                }

            }
            return NextResponse.json(
                { message: "Team not found Please register your team", },
                { status: 400 }
            );
        }

    } catch (error) {
        return NextResponse.json(
            { message: "Something Went Wrong" },
            { status: 500 }
        );
    }
}
export async function GET(req: any) {
    try {
        // Check if refer from frontend
        if (!validOrigin(req)) {
            return NextResponse.json(
                { message: "Invalid request origin" },
                { status: 401 }
            );
        }
        // Connect with database
        await connectDB();

        const queries = req.nextUrl.searchParams;
        const gameName=queries.get("game");
        let words: string[] = gameName.split('_');

        // Capitalize the first letter of each word
        let capitalizedWords: string[] = words.map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
      
        // Join the capitalized words back together
        let capitalizedFullName: string = capitalizedWords.join(' ');
       
        let user = await User.findById(queries.get("userId"))
            .populate("participations")
            .select("-password -verificationToken -forgetPasswordToken");
        for (let i = 0; i < user.participations.length; i++) {
            if (user.participations[i].eventName == capitalizedFullName) {
                const team =
                {
                    teamId: user.participations[i]._id,
                    teamName: user.participations[i].teamName,
                }
                return NextResponse.json(
                    {
                        message: ` User has registered for the event`, team
                    },
                    { status: 200 }
                );
            }
        };
        return NextResponse.json(
            { message: "Team not found Please register your team", },
            { status: 400 }
        );
    }

    catch (error) {
        return NextResponse.json(
            { message: "Something Went Wrong" },
            { status: 500 }
        );
    }
}
