import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true},
    avatar: { type: String },
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

export default User 