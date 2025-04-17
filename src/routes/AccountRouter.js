import express from "express";
import { login, signup } from "../controller/AccountController.js";
import { validation } from "../utils/validator.js";



const accountRouter = express.Router();
accountRouter.post("/signup",validation(),signup);
accountRouter.post("/login",validation(),login)

export default accountRouter;