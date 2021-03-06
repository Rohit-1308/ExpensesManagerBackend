const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const crypto=require("crypto");
const MailServices = require("../services/mailService");
const OtpService = require("../services/otpService");
require('dotenv').config();

exports.sendOtp=async (req,res)=>{
  const {email}=req.body
  try {
    let otp = await  Math.floor((Math.random() * 10000) + 1)
    const mailservice=new MailServices()
    // const salt=await bcrypt.genSalt(10)
    mailservice.sendMail(email,otp)

    const hashedOtp=await bcrypt.hash(`${otp}.${email}`,10)


    return res.status(200).json({success:true,hashedotp:hashedOtp})
  } catch (error) {
    return res.status(401).json({success:false,log:"Unable to send otp"})
  }
}


exports.register = async (req, res) => {
  const { email, password,otp,hashedotp } = req.body;
   
  const  isVerified=await bcrypt.compare(`${otp}.${email}`,hashedotp)
  
  if(!isVerified) return res.status(404).json({ error: "Enter Correct Otp" ,hashedotp});

  let user = await User.findOne({ email });

  if (user) {
    return res.status(401).json({ error: "user already exits" });
  }
  try {
    user = await User.create({
      email,
      password,
    });

    return sendToken(user, 200, res);       
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, log: "Unable to create user",hashedotp });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "user does not exits" });
  }
  try {
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      // this.sendMail(email)
      sendToken(user, 200, res);
      // return res.status(201).json({success:true})
    } else {
      return res.status(400).json({ success: false, token: null });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, log: "Internal server error" });
  }
};

const sendToken = (user, statuscode, res) => {
  
  const token = user.getSignedToken();
  console.log({token});
  
  return res.status(statuscode).json({ success: true, token });
};