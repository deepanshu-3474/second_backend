import  jwt  from "jsonwebtoken";
import AccountModel from "../model/AccountModel.js";
import { isValidPassword, passwordSalt } from "../utils/utils.js";
import 'dotenv/config'
import { sendMainFun } from "../utils/mail.js";

export async function signup(req, res, next) {

    try{
        var bodyData = req.body;

        const signupData = {
            name:bodyData.name,
            email:bodyData.email,
            password: passwordSalt(bodyData.password)
        }

        const resData = await AccountModel.create(signupData);
        if(resData){

                // const sendData = {
                //    to:signupData.email,
                //    subject:"Important !!",
                //    message:"<h1>This mail is to verify ur details</h1> <button>Verify me</button>"
                // }
//await sendMainFun(sendData).catch(console.error);
                res.status(200).json({
                    status:"success",
                    message:"signup successfull",
                    data:resData
                })
        }
    }
    catch(error){
        res.json({
            status:"failed",
            message:error
        })
    }

   
}
export function search(req, res) {
    //    const data =  req.query
    //    console.log(data)
    var data = req.params;
    res.json(data);
}
export async function login(req, res, next){
    const data = req.body;
    try{
    const loginData = {
        email: data.email,
        password: data.password
    }

    // const user = await AccountModel.findOne({$and:[{email:loginData.email},{verify_email:true}]})
    const user = await AccountModel.findOne({email:loginData.email})
    if(user){
        if(isValidPassword(data.password,user.password)){
            const payload  = {
                user_id:user._id,
                email:user.email,
                name:user.name
            }
            const SECRET_KEY = process.env.SECRET_KEY
            const token = await jwt.sign(payload,SECRET_KEY,{expiresIn:"30d"})
            res.json({
                status: "success",
                message: "user exists",
                name:user.name,
                profile_image:user.profile_image,
                token:token
            })
        }
        else{
            res.json({
                status: "failed",
                message: "invalid password"

            })
        }

    }
    else{
        res.json(
            {
                status: "failed",
                message: "invalid email"
            }
        )

    }
}
catch(error){

    res.json({
        status: "failed",
        error: error
    })

}
}

export async function changePassword(req,res,next){

}

export async function verify(req, res ,next ){
    const data = req.body;


}

export async function forgetPassword(req, res ,next){
    const data = req.body;


}
export async function uploadeProfile(req,res,next) {
    try{
      //  const data = req.body;
        const id = req.account_id;
        const profile_image = req.profile_image;
        const r = await AccountModel.updateOne({_id:id},{profile_image:profile_image});
        if(r){
            res.json({
                status:"success",
                message:"Profile Image Upload Successfully",
                profile_image:profile_image
            });

        }
        else{
            res.json({
                status:"failed",
                message:"Something issue !!"
            }); 
        }

    }
    catch(error){
        console.error(error);
        res.json({
            status:"failed",
            message:"Error !!"
        }); 
    }
    
}
