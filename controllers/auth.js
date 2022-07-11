const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

exports.register = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ error: "user already exits" });
  }
  try {
    user = await User.create({
     
      email,
      password,
    });
    // sendToken(user, 200, res);//note this returns user.getsignedtoken is not a function in reponse of this request
    
    
    const token=await jwt.sign({id:user._id},process.env.Jwt_token)//ask this to ritesh that why to i have to give json as parameter and not "user._id" as directly
    
    return res.status(200).json({ success: true,token});
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, log: "Unable to create user" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    console.log({ email });

    return res
      .status(404)
      .json({ success: false, message: "user does not exits" });
  }
  try {
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      console.log({userId:user._id});
      
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
  console.log('flow at before user.getsignedtokenm');
  
  const token = user.getSignedToken();
  console.log({token});
  
  return res.status(statuscode).json({ success: true, token });
};