const crypto=require("crypto")
require('dotenv').config();
class OtpService{


otpService(otp){
        this.otp=otp
        this.expiresIn=expiresIn
    }
    async generateOtp(){
        return Math.floor((Math.random() * 10000) + 1);
    }

    hash(){
    return crypto.createHmac("sha256",process.env.HASH_SECRET).updata("sha256").digest('hex')
    }


}

module.exports=OtpService