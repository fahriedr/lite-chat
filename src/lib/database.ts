import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!, {
            retryWrites: true, 
            w:'majority'
        })

        console.log("Connect to MongoDB")
    } catch (error) {
        throw new Error("Error connecting to MongoDB")
    }
}