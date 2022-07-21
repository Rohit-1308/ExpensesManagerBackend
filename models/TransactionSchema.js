const moongoose=require('mongoose')
const {Schema}=moongoose

const TransactionSchema= new Schema({
    user:{
        type:moongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    type:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    note:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    month:{
        type:String
    
    }
    
})


const Transaction=moongoose.model('Transaction',TransactionSchema)

module.exports=Transaction  