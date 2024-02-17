import { MongoClient } from "mongodb";
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server";

declare global {
    var mongoose: any
}

const MONGODB_URI = process.env.MONGO_URL!;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGO_URL environment variable inside .env.local",
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}