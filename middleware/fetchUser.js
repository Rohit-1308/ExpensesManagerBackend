const jwt=require('jsonwebtoken')
require('dotenv').config();

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send("Please authenticate using valid token")
    }
    try {
        const data=jwt.verify(token,process.env.JWT_TOKEN)
        req.user=data;
        console.log(`fetch user succesfull`);
        
        next()
    } catch (error) {
        res.status(401).send("Please authenticate using valid token")

    }
}

module.exports=fetchuser