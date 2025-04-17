import mongoose  from "mongoose";
import 'dotenv/config'
mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`).then(()=>{
    console.log("connection successful...")
}).catch((error)=>{
    console.log("connection failed....")
})

export default mongoose;