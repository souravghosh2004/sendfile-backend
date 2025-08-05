import mongoose from "mongoose";
import { MONGODB_URI, DB_NAME } from "./env.confing.js";
const connectDB = async () => {
    try {
        const connect =  await mongoose.connect(`${MONGODB_URI}${DB_NAME}`);
        
    console.log(`✅ MongoDB connected! DB HOST: ${connect.connection.host}`);

    } catch (error) {
        console.log("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDB;