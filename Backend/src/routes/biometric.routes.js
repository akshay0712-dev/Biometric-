import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { userBiometricData } from "../controllers/biometric.controllers.js";

const biometricRouter = Router()
biometricRouter.route("/upload").post(upload.single("file"), userBiometricData);

export default biometricRouter