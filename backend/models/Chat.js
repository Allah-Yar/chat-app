// import mongoose from "mongoose";

// const ChatSchema = new mongoose.Schema(
//   {
//     sender: { type: String, required: true },
//     receiver: { type: String }, // for DMs
//     room: { type: String },     // for rooms
//     text: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Chat", ChatSchema);

import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: false }, // Optional for room chats
    room: { type: String, required: false },     // Optional for direct messages
    text: { type: String, required: true },      // Ensure text is required
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);


