// import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const getAllUsers = asyncHandler(async (req, res) => {

    
    const users = await User.find({}).select("-password, -refreshTokens");
    
    return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
})


export { getAllUsers };