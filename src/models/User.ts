import mongoose, { Schema, Document } from "mongoose";

// Define the structure of the profile document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  birthday: string;
  address: string;
  phone: string;
  gender: string;
  language: string;
  username: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name field is required."],
    minLength: [2, "Name must be at least 2 characters long."],
  },

  email: {
    required: [true, "Email field is required."],
    type: String,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  birthday: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

});

// Export the User model
export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
