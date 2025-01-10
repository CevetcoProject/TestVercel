import mongoose, { Schema, Document } from "mongoose";

// Define the structure of the profile document
interface IAccess extends Document {
  name: string;
  description: string;
  services: string[];
  functionalities: string[];
}

const accessSchema = new Schema<IAccess>({
  name: {
    type: String,
    required: [true, "Name is required."],
  },

  description: {
    type: String,
    required: [true, "Description is required."],
  },

  services: {
    type: [String], // This is an array of strings
    required: true,
  },

  functionalities: {
    type: [String], // This is also an array of strings
    required: true,
  },
});

// Create or retrieve the Profile model from Mongoose
export const Access = mongoose.models.Access || mongoose.model<IAccess>("Access", accessSchema);



















