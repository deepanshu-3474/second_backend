import jwt from 'jsonwebtoken';
import 'dotenv/config'
export function checkAuth(req,res,next){
    try{
        const token = req.header("Authorization").split(" ")[1];
        const SECRET_KEY = process.env.SECRET_KEY;
        
       if(jwt.verify(token,SECRET_KEY)){
            next();
       }
        else{
            res.status(403).json({status:"failed",message:"unauthorized user !!"});
        }
    }
    catch(err){
            res.status(403).json({status:"failed",message:"unauthorized user !!"});
    }
}