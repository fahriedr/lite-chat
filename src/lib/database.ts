import mongoose from "mongoose";

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const MONGODB_URI = "mongodb+srv://cuirass-admin:sXEdhc5sXXbsk87R@cuirass-app.nxapkrc.mongodb.net/lite-chat?retryWrites=true&w=majority" //process.env.MONGO_URL!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URL environment variable.");
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("strictQuery", false);
    const opts = { bufferCommands: false };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      // Optional: Dynamically import models here if needed
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
