import mongoose, { Schema } from "mongoose";

const performanceSchema = new Schema({
    
}, { timestamps: true });

export const Performance = mongoose.model("Performance", performanceSchema);