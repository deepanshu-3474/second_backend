// file: controller/EmployeeController.js
import axios from "axios";
import EmployeeModel from "../model/EmployeeModel.js";
import { validationResult } from "express-validator";

// Utility to handle validation errors
function handleValidationError(res, error) {
    if (error.name === "ValidationError") {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        return res.status(400).json({
            status: "failed",
            error: errors
        });
    }
    res.status(500).json({
        status: "error",
        message: error.message
    });
}

// Add New Employee
export async function addEmployee(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "failed", errors: errors.array() });
    }

    try {
        const empData = req.body;
        const empRes = await EmployeeModel.create(empData);
        res.status(201).json({
            status: "success",
            data: empRes
        });
    } catch (error) {
        handleValidationError(res, error);
    }
}

// Update Employee by ID
export async function updateEmployee(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;

        const empUpdateres = await EmployeeModel.updateOne({ _id: id }, data);

        if (empUpdateres.matchedCount === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Employee not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Employee updated",
            data: empUpdateres
        });
    } catch (error) {
        handleValidationError(res, error);
    }
}

// Delete Employee by ID
export async function deleteEmployee(req, res, next) {
    try {
        const emp_id = req.params.id;

        const deleteEmp = await EmployeeModel.deleteOne({ _id: emp_id });

        if (deleteEmp.deletedCount === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Employee not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Employee deleted",
            data: deleteEmp
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

// Get All Employees
export async function getEmployee(req, res, next) {
    try {
        const empData = await EmployeeModel.find();
        res.status(200).json({
            status: "success",
            data: empData
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Data not found"
        });
    }
}

// Get Single Employee by ID
export async function singleEmployee(req, res, next) {
    try {
        const { id } = req.params;
        const singleEmp = await EmployeeModel.findById(id);

        if (!singleEmp) {
            return res.status(404).json({
                status: "failed",
                message: "Employee not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: singleEmp
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

// Search Employees by Name (partial match)
export async function searchEmployee(req, res, next) {
    try {
        const { name } = req.query;

        const employees = await EmployeeModel.find({
            emp_name: { $regex: name, $options: 'i' }
        });

        res.status(200).json({
            status: "success",
            count: employees.length,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
}

// Get External Employee Details from API
export async function getDetails(req, res, next) {
    try {
        const data = await axios.get('https://reqres.in/api/users?page=2');
        res.status(200).json({
            status: "success",
            data: data.data
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}
