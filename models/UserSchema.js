const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {Schema}=mongoose;

const UserSchema=new Schema({
    name:{
        type:String
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
UserSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

UserSchema.methods.getSignedToken=function(user){    
    return jwt.sign(this.id,process.env.JWT_TOKEN)
}
const User=mongoose.model('User',UserSchema)
module.exports=User