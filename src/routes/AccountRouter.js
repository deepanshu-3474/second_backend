import express from "express";
import { login, signup,uploadeProfile } from "../controller/AccountController.js";
import { validation } from "../utils/validator.js";
import upload from "../middleware/uploadMiddleware.js";
import { checkAuth } from "../middleware/Authorization.js";



const accountRouter = express.Router();
accountRouter.post("/signup",validation(),signup);
accountRouter.post("/login",validation(),login);
accountRouter.use(checkAuth);
accountRouter.post("/uploadprofile",upload.single("profile_image"),uploadeProfile)
// accountRouter.post("/forgetpassword",validation(),forget)

export default accountRouter;