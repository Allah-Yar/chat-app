// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     min: 3,
//     max: 20
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     max: 50
//   },
//   password: {
//     type: String,
//     required: true,
//     min: 6
//   },
//   profilePicture: {
//     type: String,
//     default: ""
//   },
//   isOnline: {
//     type: Boolean,
//     default: false
//   }
// }, 
// { timestamps: true }
// );

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Regex for email validation
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
