import mongoose, { Schema, Document, models, model } from "mongoose";

export type AuthProvider = 'google' | 'github' | 'local'
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    fullname: string;
    email: string;
    username: string,
    avatar: string,
    password?: string,
    provider: AuthProvider
}

const UserSchema = new Schema<IUser>({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true},
    avatar: { type: String },
    provider: { 
        type: String, 
        enum: ['google', 'github', 'local'], 
        default: 'local' }
}, {
    timestamps: true
})

const User = models.User || model<IUser>('User', UserSchema);

export default User