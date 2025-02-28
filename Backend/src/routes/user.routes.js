import { Router } from "express";
import {
  changeCurrentUserPassword,
  registerUser,
  updateUserAvatar,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser } from "../controllers/user.controllers.js";
import { logoutUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/update_password").post(verifyJWT, changeCurrentUserPassword);
router.route("/update_avatar").post(verifyJWT ,upload.single("avatar"), updateUserAvatar);
router.route("/refresh_token").post(refreshAccessToken);

export default router;
