import axios from "axios";
import EmployeeModel from "../model/EmployeeModel.js";
export async function addEmployee(req,res,next){
    try{
        const data = req.body;
        const empData = {
            emp_name:data.emp_name,
            emp_email:data.emp_email,
            emp_job_city:data.emp_job_city,
            emp_maritail_status:data.emp_maritail_status,
            emp_age:data.emp_age
        }

   const empRes = await EmployeeModel.create(empData);
       if(empRes)
       {
        res.json(
            {
                status:"success",
                data:empData
            }
        )
       }
        // res.json({
        //    jjjjjjjjjjjjjjjjjjjjjjj:data.emp_name
        // })
       
    }
    catch(error)
    {
        const resError = {}
          resError.status = "failed"
          if (error.name === "ValidationError") {
              let errors = {};
              Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
              });
              resError.error = errors;
            }
          res.json(resError)
    }

  

}
 export async function updateEmployee(req,res,next) {
     try{
        
        // const data = req.params; // for get data from url

        // const data = req.query;
        // console.log(data);

        const {id} = req.params;
        
        //const data = req.query;

        
        
        const data = req.body;
        const updateEmployeeData = {
        emp_name:data.emp_name,
        emp_email:data.emp_email,
        emp_job_city:data.emp_job_city,
        emp_maritail_status:data.emp_maritail_status,
        emp_age:data.emp_age

    }

    const empUpdateres = await EmployeeModel.updateOne({_id:id},updateEmployeeData)
    if(empUpdateres){
        res.json(
            {
                status:"sucess",
                message:"data updated",
                data:empUpdateres
                
            }
        )
    }
    // res.json({
    //     id:id,
    //     data: data
    // })
}
    catch(error){
        const resError = {}
          resError.status = "failed"
          console.error(error)
          if (error.name === "ValidationError") {
              let errors = {};
              Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
              });
              resError.error = errors;
            }
          res.json(resError)

    }
    }

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
    
    
 export async function getEmployee(req,res,next) {
    try{
        const empData = await EmployeeModel.find();
        res.json({
            status: "success",
            data: empData,
        });
    }
    catch(error){
        res.json({
            message: "data not found"
        })
    }
    
    
 }
 export async function singleEmployee(req,res,next) {
    // const data = req.body;

    try{
    const {id} = req.params;

    const singleEmp =  await EmployeeModel.findById({_id:id})
    if(singleEmp){
        res.json({
            status: "Employee Found",
            data: singleEmp
        })
    }
}catch(error){
    console.error(error)
    res.json({
        status:"not founs",
        message:error
    })

}

 }
 export async function searchEmployee(req, res, next) {
    try {
        console.log(req.query)
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
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
}



 export async function getDetails(req, res, next) {
    try {
        const data = await axios.get('https://reqres.in/api/users?page=2');
        res.json({
            data: data.data
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: "not found",
            message: error.message
        });
    }
}