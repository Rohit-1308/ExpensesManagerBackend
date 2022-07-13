const nodemailer=require("nodemailer");
const { sendMail } = require("./auth");


exports.sendMail=async ()=>{
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: "khalaterohit13@gmail.com", // generated ethereal user
          pass: process.env.GMAIL_PASSWORD, // generated ethereal password
        },
      });
    
      let info = await transporter.sendMail({
        from: 'khalaterohit13@gmail.com', // sender address
        to: "rohit.khalate.it.2020@vpkbiet.org", // list of receivers
        subject: "VERIFICATION REGARDING VERIFICATION", // Subject line
        text: "registeration successfull", // plain text body
        // html: "<b>Hello world?</b>", // html body
      });
}
sendMail()