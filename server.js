const express=require("express")
const app=express()
require('dotenv').config()
const cors=require('cors')


const connectToMongo=require('./config/db.js')



app.use(cors({origin:"https://localshost:3000"}))
connectToMongo();
app.use(express.json())


app.get("/",(req,res)=>{ res.send("This is rk")})

app.use("/api/auth",require('./routes/auth'))

app.use("/api/expense",require('./routes/expense'))

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server listening at http://localhost:3000`)
})