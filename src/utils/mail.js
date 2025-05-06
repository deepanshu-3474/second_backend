// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "anshukeshri64@gmail.com",
    pass: "uaetgmpuzdonxsyk",
  },
});

// async..await is not allowed in global scope, must use a wrapper

export async function verifyme(req,res, next) {
     try{
            const token = req.header("Authorization").split(" ")[1];
            const SECRET_KEY = process.env.SECRET_KEY;
            
           if(jwt.verify(token,SECRET_KEY)){
                req.verify= true;
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

export async function sendMainFun(sendData) {
  // send mail with defined transport object
  console.log(sendData)
  
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻"<anshukeshri64@gmail.com>', // sender address
    to: `${sendData.to}`, // list of receivers
    subject: `${sendData.subject}`, // Subject line
    // text: "", // plain text body
    html: `${sendData.message}`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  
}

// main().catch(console.error);
