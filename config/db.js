const mongoose=require('mongoose');


const connectToMongo= async ()=>{
    try {
        
        await mongoose.connect(process.env.DATABASE_URI)
        console.log('mongodb connection successfull');
        
    } catch (error) {
        console.log(error.message);
        console.log('connection to mongodb failed');
    }
}
module.exports=connectToMongo