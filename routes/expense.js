const express=require("express")
const router=express.Router()
const {addTransaction,getMontlyIncomeAndExpense,getMonthlyTransactions}=require('../controllers/expense')
const fetchUser=require('../middleware/fetchUser')

router.post('/addTransaction',fetchUser,addTransaction)
router.post('/getMontlyIncomeAndExpense',fetchUser,getMontlyIncomeAndExpense)
router.post('/getMonthlyTransactions',fetchUser,getMonthlyTransactions)

module.exports=router