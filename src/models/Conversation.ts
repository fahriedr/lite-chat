import mongoose, { Schema } from "mongoose";

const ConversationSchema = new Schema({
    participants: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
            ref: "User" 
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
}, {
    timestamps: true
})

const Conversation = mongoose.models['Conversation'] || mongoose.model('Conversation', ConversationSchema)

export default Conversation