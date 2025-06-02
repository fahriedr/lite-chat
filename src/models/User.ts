import mongoose, { Schema, Document, models, model } from "mongoose";

export type AuthProvider = 'google' | 'github' | null
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId,
    fullname: string,
    email: string,
    username: string,
    avatar: string,
    isEmailVerified: boolean,
    password?: string | null,
    googleId?: string,
    githubId?: string,
    access_token?: string,
    provider: AuthProvider,
    isActive: boolean,
}

const UserSchema = new Schema<IUser>({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    email: { type: String, required: true, unique: true},
    avatar: { type: String },
    isEmailVerified: { type: Boolean, default: false},
    googleId: { type: String, unique: true, default: null},
    githubId: { type: String, unique: true, default: null},
    provider: { 
        type: String, 
        enum: ['google', 'github'], 
        default: null 
    },
    isActive: { type: Boolean, default: true}
}, {
    timestamps: true
})

// const User = models.User || model<IUser>('User', UserSchema);
const User = (mongoose.models?.User as mongoose.Model<IUser>) || model<IUser>('User', UserSchema);

export default User