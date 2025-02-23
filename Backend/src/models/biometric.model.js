import mongoose, { Schema } from "mongoose";

const biometricSchema = new Schema(
  {
    rollNo: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    workingDay: {
      type: Number,
      required: true,
    },
    presentDay: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Biometric = mongoose.model("Biometric", biometricSchema);
