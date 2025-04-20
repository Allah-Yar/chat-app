import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String }, // for DMs
    room: { type: String },     // for rooms
    text: String,
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);



