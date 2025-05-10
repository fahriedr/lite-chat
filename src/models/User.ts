import mongoose, { Schema, Document, models, model } from "mongoose";

export type AuthProvider = 'google' | 'github' | null
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId,
    fullname: string,
    email: string,
    username: string,
    avatar: string,
    email_verified: boolean,
    password?: string | null,
    google_id?: string,
    github_id?: string,
    access_token?: string,
    provider: AuthProvider,
    is_active: boolean
}

const UserSchema = new Schema<IUser>({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    email: { type: String, required: true, unique: true},
    avatar: { type: String },
    email_verified: { type: Boolean, default: false},
    google_id: { type: String, unique: true, default: null},
    github_id: { type: String, unique: true, default: null},
    provider: { 
        type: String, 
        enum: ['google', 'github'], 
        default: null 
    },
    is_active: { type: Boolean, default: true}
}, {
    timestamps: true
})

// const User = models.User || model<IUser>('User', UserSchema);
const User = (mongoose.models?.User as mongoose.Model<IUser>) || model<IUser>('User', UserSchema);

export default User