// file: model/EmployeeModel.js
import mongoose from "mongoose";
import COLLECTION from "../db/collection.js"; // Ensure this exports a string like { employeedetails: 'employees' }

// Employee Schema Definition
const EmployeeSchema = new mongoose.Schema({
    emp_name: {
        type: String,
        required: [true, "Employee name is required"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z ]{2,30}$/.test(v); // Properly test the name pattern
            },
            message: props => `${props.value} is not a valid name`
        }
    },

    emp_email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: {
            validator: function (v) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    emp_job_city: [
        {
            city: { type: String }
        }
    ],

    emp_maritail_status: {
        type: String,
        enum: {
            values: ["Single", "Married"],
            message: 'Marital status must be either "Single" or "Married"'
        }
    }

}, { timestamps: true });

const EmployeeModel = mongoose.model(COLLECTION.employeedetails, EmployeeSchema);

export default EmployeeModel;
