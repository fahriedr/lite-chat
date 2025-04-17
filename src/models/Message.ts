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
    },
    isRead: {
        type: mongoose.Schema.Types.Boolean,
        require: true,
        default: false
    }

}, {
    timestamps: true
})

const Message = mongoose.models['Message'] || mongoose.model('Message', MessageSchema)

export default Message