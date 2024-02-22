import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        profileImage: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String,
            length: 10
        },
        mode: {
            type: String,
            enum: ["online", "offline"]
        },
        transactionId: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;