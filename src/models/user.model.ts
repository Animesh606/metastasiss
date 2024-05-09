import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            required: true
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
        // transactionId: String,
        // transactionVerified: {
        //     type: Boolean,
        //     default: false
        // },
        isAdmin: {
            type: Boolean,
            default: false
        },
        participations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        }],
        votedTeam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        },
        profileImage: String,
        verificationToken: String,
        forgetPasswordToken: String
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateVerificationToken = async function() {
    const hashedToken = await bcrypt.hash(`${this._id}`, 10);
    this.verificationToken = hashedToken;
    await this.save();
    return hashedToken;
};

userSchema.methods.generateForgotPasswordToken = async function() {
    const hashedToken = await bcrypt.hash(`${this._id}`, 10);
    this.forgetPasswordToken = hashedToken;
    await this.save();
    return hashedToken;
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        { _id: this._id, fullName: this.fullName, email: this.email },
        `${process.env.SECRET_KEY}`
    );
};

userSchema.methods.verifyUser = async function() {
    this.verificationToken = undefined;
    this.isVerified = true;
    await this.save();
};

userSchema.methods.resetPassword = async function(password: string) {
    this.password = password;
    this.forgetPasswordToken = undefined;
    await this.save();
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;