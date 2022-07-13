const express=require('express')
const router=express.Router()
const {login,register,sendOtp}=require('../controllers/auth')
router.post('/login',login)
router.post('/register',register)
router.post('/sendOtp',sendOtp)

module.exports=router