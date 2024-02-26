import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            length: 10
        },
        college: String,
        password: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String,
            enum: ["online", "offline"],
            default: "online"
        },
        transactionId: String,
        transactionVerified: {
            type: Boolean,
            default: false
        },
        profileImage: String,
        verificationToken: String,
        forgetPasswordToken: String
    },
    {
        timestamps: true
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;