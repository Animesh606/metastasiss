import connectDB from "@/utils/db.connect";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/utils/uploadImage";
import User from "@/models/user.model";
import Team from "@/models/team.model";
import sendEmail from "@/utils/mailer";
import validOrigin from "@/utils/apiRequestOrigin";
import cloudinary from "@/../cloudinary.config";
export async function POST(req: any,res:any) {
    try {
     
        // Check if refer from frontend
        if(!validOrigin(req)) {
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
        const leaderIdCard = formData.get("leaderIdCard");
        // console.log(leaderIdCard)
        if (!teamName || !eventName || !members || !userId || !leaderIdCard) {
            return NextResponse.json(
                { message: "Field Missing" },
                { status: 400 }
            );
        }
        
      
        const mycloud=await cloudinary.uploader.upload(leaderIdCard,{
            folder:"WebData/Metastasiss/CollegeId/",
            width:150,
            crop:"scale"
        })
        const url = mycloud.secure_url;
        // const url= result.secure_url;
        // Connect with database
        await connectDB();

        // Find leadUserDetails
        const leadUser = await User.findById(userId);
        if (!leadUser) {
            return NextResponse.json(
                { message: "User is not authenticate" },
                { status: 401 }
            );
        }

        // Parse members
        const memberArray = await JSON.parse(members);

        // Get all members full details
        let users = <any[]>[];

        for (let i = 0; i < memberArray.length; i++) {
            // Get member details
            let user = await User.findOne({
                email: memberArray[i].email,
                isVerified: true,
            })
                .populate("participations")
                .select("-password -verificationToken -forgetPasswordToken");

            // If user not exist
            if (!user) {
                return NextResponse.json(
                    { message: `${memberArray[i].name} is not a verified user` },
                    { status: 403 }
                );
            }

            // If user already registered for the event
            for(let i = 0; i < user.participations.length; i++) {
                if (user.participations[i].eventName === eventName) {
                    return NextResponse.json(
                        {
                            message: `${memberArray[i].name} is already registered for this event`,
                        },
                        { status: 403 }
                    );
                }
            };

            // add user to users list
            users.push(user);
        }

        // users with only ids
        const userIds = users.map((u: any) => u._id);

        // create the team
        const newTeam = new Team({
            teamName,
            leaderDetails: userId,
            members: userIds,
            eventName,
            collegeId: url,
        });
       
        await newTeam.save();

        // Add team to partipation list of each user
        await User.findByIdAndUpdate(userId, {
            $push: { participations: newTeam._id },
        });
        for (let i = 0; i < userIds.length; i++) {
            await User.findByIdAndUpdate(userIds[i], {
                $push: { participations: newTeam._id },
            });
        }

        await sendEmail("teamRegistration", {
            email: leadUser.email,
            fullName: leadUser.fullName,
            teamName,
            eventName,
            leadUser,
            members: memberArray
        });
        
        for(let i = 0; i < users.length; i++) {
            await sendEmail("teamRegistration", {
                email: users[i].email,
                fullName: users[i].fullName,
                teamName,
                eventName,
                leadUser,
                members: memberArray
            });
        }

        return NextResponse.json(
            { message: "Team registered successfully" },
            { status: 201 }
        );
    } catch (error) {
    
        return NextResponse.json(
            { message: "Something Went Wrong.." },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
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
        
        // Find all the team Details
        const teams = await Team.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "leaderDetails",
                    foreignField: "_id",
                    as: "leaderDetails",
                    pipeline: [
                        {
                            $project: {
                                password: false,
                                participations: false,
                                verificationToken: false,
                                forgetPasswordToken: false
                            }
                        }
                    ]
                }
                
            },
            {
                $addFields: {
                    leaderDetails: {
                        $first: "$leaderDetails"
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "members",
                    pipeline: [
                        {
                            $project: {
                                password: false,
                                participations: false,
                                verificationToken: false,
                                forgetPasswordToken: false
                            }
                        }
                    ]
                }
            }
        ]);

        return NextResponse.json(
            { message: "Teams found successfully", teams },
            { status: 200 }
        );
    } catch (error) {
        // console.log(error);
        return NextResponse.json(
            { message: "Something Went Wrong.." },
            { status: 500 }
        );
    }
}