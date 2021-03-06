const Transaction = require("../models/TransactionSchema");
const fetchuser=require('../middleware/fetchUser');
const { findOne } = require("../models/UserSchema");
const User = require("../models/UserSchema");

exports.addTransaction = async (req, res) => {
  const { type, amount, date, note } = req.body;
  const month = date.split("-")[1];

  try {
    await Transaction.create({
      user:req.user,
      type,
      amount,
      date,
      note,
      month,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.msg,
      error: "INTERNAL SERVER ERROR",
    });
  }
};

exports.getMontlyIncomeAndExpense = async (req, res) => {
  const { date } = req.body; //date format is yyyy-mm-dd
  const actualMonth = date.split("-")[1];
  
  console.log(req.user);
  
  try {
    const user =await User.findById(req.user)
    console.log(user);
        
    const transactions = await Transaction.aggregate([
      // { $match: { month: actualMonth,user:req.user } },
      { $match: { $and:[{month:actualMonth},{user:user._id}] } },
      { $group: { _id: "$type", amount: { $sum: "$amount" } } },
    ]);
    console.log(transactions);
    
    let income = 0;
    let expense = 0;

    transactions.forEach((arrayitem) => {
      if (arrayitem._id == "income") {
        income = arrayitem.amount;
      } else {
        expense = arrayitem.amount;
      }
    });
    return res.status(200).json({ success: true, income, expense });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.msg,
      error: "INTERNAL SERVER ERROR",
    });
  }
};

exports.getMonthlyTransactions = async (req, res) => {
  const { date } = req.body;
  const month = date.split("-")[1];
  try {
    const transactions = await find({ month,user:req.user });
    return res.status(200).json({ success: true, transactions });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.msg,
      error: "INTERNAL SERVER ERROR",
    });
  }
};
