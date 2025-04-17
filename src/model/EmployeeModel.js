import "../db/db.js"
import mongoose from "mongoose";
import COLLECTION from "../db/collection.js";


// schema is validitor
// orm object relational model : 
const EmployeeSchema = new mongoose.Schema({
    emp_name:{type:String,required:[true,"Employee name is required"],validate:{
        validator:function(v){
            return /^[a-zA-Z ]{2,30}$/; // schema validator
        },
        message:props=>`{$props.value} is not valid name`
    }},


    emp_email:{
        type:String,
        unique:true,
        validate: {
        validator: function(v) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      required: [true, 'email is required']
    },

    emp_job_city:[
            {city:{type:String}}
    ],
    emp_maritail_status:{
        type:String,
        enum:{
            values:["Single", "Married"],
            message: ` not supported`
        }
    },
    // emp_age:{type:Number,min:18,max:100},

},{timestamps:true})

const EmployeeModel = mongoose.model(COLLECTION.employeedetails,EmployeeSchema)

export default EmployeeModel;