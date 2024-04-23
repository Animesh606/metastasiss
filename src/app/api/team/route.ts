import connectDB from "@/utils/db.connect";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/utils/uploadImage";
import User from "@/models/user.model";
import Team from "@/models/team.model";
import sendEmail from "@/utils/mailer";
import validOrigin from "@/utils/apiRequestOrigin";
import cloudinary from "@/../cloudinary.config";
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
        const submission = formData.get("submission")?.toString();
        const leaderIdCard = formData.get("leaderIdCard");
        const user= formData.get("checkUserData")?.toString(); 
         const users=JSON.parse(user);
        if (!teamName || !eventName || !members || !userId || !leaderIdCard) {
            return NextResponse.json(
                { message: "Field Missing" },
                { status: 400 }
            );
        }

        const mycloud = await cloudinary.uploader.upload(leaderIdCard, {
            folder: "WebData/Metastasiss/CollegeId/",
            width: 150,
            crop: "scale",
        });
        const url = mycloud.secure_url;

        // Connect with database
        await connectDB();

        // Find leadUserDetails
        const leadUser = await User.findById(userId)
            .populate("participations")
            .select("-password -verificationToken -forgetPasswordToken");
 

        // // Parse members
     
         const memberArray = await JSON.parse(members);
        const userIds = users.map((u: any) => u._id);
        const newTeam = new Team({
            teamName, 
            leaderDetails: userId, 
            members: userIds, 
            eventName, 
            collegeId: url, 
            submission,
        });

        await newTeam.save();
  
        // Create an array of promises for each user update
        const userUpdatePromises = userIds.map((userId: any) => {
            return User.findByIdAndUpdate(userId, {
                $push: { participations: newTeam._id },
            });
        });

        // Add the creator's team to the participation list
        userUpdatePromises.push(User.findByIdAndUpdate(userId, {
            $push: { participations: newTeam._id },
        }));

        // Execute all update operations concurrently
        await Promise.all(userUpdatePromises);

        await sendEmail("teamRegistration", {
            email: leadUser.email,
            fullName: leadUser.fullName,
            teamName,
            eventName,
            leadUser,
            members: memberArray,
            sumittedBy: undefined,
            link: ""
        });

        for(let i = 0; i < users.length; i++) {
            await sendEmail("teamRegistration", {
                email: users[i].email,
                fullName: users[i].fullName,
                teamName,
                eventName,
                leadUser,
                members: memberArray,
                sumittedBy: undefined,
                link: ""
            });
        }

        return NextResponse.json(
            { message: "Team registered successfully", newTeam},
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
        return NextResponse.json(
            { message: "Something Went Wrong.." },
            { status: 500 }
        );
    }
}