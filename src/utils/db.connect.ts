import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI!);
        console.log("MongoDB Connected...");
    } catch (err: any) {
        console.log("Error on Connecting to MongoDB", err.message);
    };
};
export default connectDB;