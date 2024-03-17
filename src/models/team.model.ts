import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        teamName: {
            type: String,
            required: true
        },
        leaderDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        eventName: {
            type: String
        },
        collegeId: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;