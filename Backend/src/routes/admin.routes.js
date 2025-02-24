import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { userBiometricData } from "../controllers/biometric.controllers.js";
import { getAllUsers } from "../controllers/admin.controllerrs.js";


const admin = Router()
admin.route("/upload").post(upload.single("file"), userBiometricData);

admin.route("/users").post(getAllUsers);



export default admin