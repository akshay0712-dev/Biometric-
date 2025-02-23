import fs from "fs";
// import path from "path";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// import { User } from "../models/user.model.js"; // Import your User model
// import { fileURLToPath } from "url";
import xlsx from "xlsx";
// import { log } from "console";
import { Biometric } from "../models/Biometric.model.js";

const userBiometricData = asyncHandler(async (req, res) => {
  //   fetch data from .xlsx file
  //   save data to database
  //   delete file
  //   return response
  const biometricLocalPath = req.file?.path;
  if (!biometricLocalPath) {
    throw new ApiError(400, "Biometric file is required");
  }
//   console.log(biometricLocalPath);
  const workbook = xlsx.readFile(biometricLocalPath);

  let rollNo, name, workingDay, presentDay;
  // Select the first sheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert sheet data to JSON
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  let biometricData;
  let end = jsonData.length-3;
  for (let i = 8; i <= end; i++) {
    rollNo = jsonData[i]?.__EMPTY_3;
    name = jsonData[i]?.__EMPTY_2;
    const keys = Object.keys(jsonData[i]);
    const presentKey = keys[keys.length - 3];
    presentDay = jsonData[i][presentKey];
    const workingKey = keys[keys.length - 2];
    workingDay = jsonData[i][workingKey];
    console.log(
      `Roll number: ${rollNo}, Name: ${name}, Working Day: ${workingDay}, Present Day: ${presentDay}\n`
    );

    // console.log("Roll number: ",rollNo);
    // console.log("Name: ",name);
    // console.log("Working Day: ",workingDay);
    // console.log("Present Day: ",presentDay);
    // console.log("\n");
    biometricData = await Biometric.create({
      rollNo,
      name,
      workingDay,
      presentDay,
    });

    const createdBioData = await Biometric.findById(biometricData._id);

    if (!createdBioData) {
      throw new ApiError(
        500,
        "Something went wrong while creating Biometric data"
      );
    }
  }
  await fs.unlinkSync(biometricLocalPath);
  return res
    .status(201)
    .json(new ApiResponse(200, biometricData, "User registered successfully"));
});

export { userBiometricData };
