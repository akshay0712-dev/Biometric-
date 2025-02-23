import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Biometric } from "../models/Biometric.model.js";


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    registationNo: {
      type: Number,
      required: true,
      trim: true,
      index: true,
    },
    rollNo: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    totalPresentDay: {
      type: Number,
      default: 0,
    },
    totalWorkingDay: {
      type: Number,
      default: 0,
    },
    department: {
      type: String,
      required: true,
      enum: [
        "Computer Science Engineering",
        "CSE in Artificial Intelligence and Machine Learning",
        "Civil Engineering",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Electronics and Communication Engineering",
      ],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/detchyy1o/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1736948033/samples/balloons.jpg",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    refreshTokens: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  //  Encript the password before saving the user model
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isNew) return next(); // Only execute for new users

  const biometricData = await Biometric.findOne({ rollNo: this.rollNo });

  if (biometricData) {
    this.totalPresentDay = biometricData.presentDay;
    this.totalWorkingDay = biometricData.workingDay;
  }

  next(); // Move to the next middleware
});


userSchema.methods.isPasswordCorrect = async function (password) {
  // Compare the password with the hashed password
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
