import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatApp');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default dbConnect;