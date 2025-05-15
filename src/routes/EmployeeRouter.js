import express from "express";
import { addEmployee, deleteEmployee, getDetails, getEmployee, searchEmployee, singleEmployee, updateEmployee ,uploadImage} from "../controller/EmployeeController.js";
import { query } from "express-validator";
import { checkAuth } from "../middleware/Authorization.js";
import upload from "../middleware/uploadMiddleware.js";

const employeeRouter = express.Router();

employeeRouter.use(checkAuth);
employeeRouter.post("/",query('emp_name','emp_email').notEmpty(),addEmployee);
employeeRouter.get("/getdetails",getDetails);
employeeRouter.get("/search",searchEmployee);
employeeRouter.get("/",getEmployee);
employeeRouter.put("/:id",updateEmployee);
employeeRouter.delete("/:id",deleteEmployee);
employeeRouter.get("/:id",singleEmployee);
//employeeRouter.post("/uploadimage",upload.array("image"),uploadImage); // upload multiple image with single name
employeeRouter.post("/uploadimage",upload.single("image"),uploadImage); // upload only single image
//employeeRouter.post("/uploadimage",upload.fields([{name:"image"},{name:"photo"},{name:"xyz"}]),uploadImage); // upload multiple image with indivisual name

export default employeeRouter;