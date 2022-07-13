const nodemailer=require("nodemailer")
const crypto=require("crypto")

class MailServices{
 
   sendMail=async (senderMail,otp)=>{
     
      let transporter = nodemailer.createTransport({
          service:"gmail",
          auth: {
            user: "khalaterohit13@gmail.com", // generated ethereal user
            pass: "eihtyaawsihpuhdl", // generated ethereal password
          },
        });
      let info = await transporter.sendMail({
        from: 'khalaterohit13@gmail.com', // sender address
        to: senderMail, // list of receivers
        subject: "OTP FOR VERIFICATION ", // Subject line
        text: `${otp}`, // plain text body
        // html: "<b>Hello world?</b>", // html body
      });
   
     
      
}
}


module.exports=MailServices