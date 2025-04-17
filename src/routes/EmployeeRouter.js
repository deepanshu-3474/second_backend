import express from "express";
import { addEmployee, deleteEmployee, getEmployee, searchEmployee, singleEmployee, updateEmployee } from "../controller/EmployeeController.js";
import { query } from "express-validator";
import { checkAuth } from "../middleware/Authorization.js";
const employeeRouter = express.Router();

employeeRouter.use(checkAuth);

employeeRouter.post("/",query('emp_name','emp_email').notEmpty(),addEmployee);
employeeRouter.get("/",getEmployee);
employeeRouter.put("/:id",updateEmployee);
employeeRouter.delete("/:id",deleteEmployee);
employeeRouter.get("/:id",singleEmployee);
employeeRouter.get("/search",searchEmployee);

export default employeeRouter;