import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "user" 
    },
    receiverId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "user" 
    },
    message: {
        type: mongoose.Schema.Types.String,
        required: true,
    }

}, {
    timestamps: true
})

const Message = mongoose.models['Message'] || mongoose.model('Message', MessageSchema)

export default Message