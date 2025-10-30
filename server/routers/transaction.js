
import express from "express"
import authenticateUser from "../middlewares/authentication.js"
import sendResponse from "../helpers/sendResponse.js"
import Transaction from "../Models/Transaction.js"
import User from "../Models/User.js"
const router  = express.Router()

router.post("/add", authenticateUser, async (req,res)=>{
    try{
        const {type, amount, reason} = req.body
        if(!type || !amount || !reason){
            return sendResponse(res, 404, null, true, "Kindly fill all fields")
        }
        const transaction = await Transaction.create({type, amount, reason, user: req.user._id})
        sendResponse(res, 201, transaction, false, "Transaction Successfull!")
    }catch(error){
        console.log("error form catch of add route in transaction file=> ", error.message)
        sendResponse(res, 500, null ,true, error.message)
    }
})

router.get("/all", authenticateUser, async (req,res)=>{
  try{
      const transactions = await Transaction.find({user: req.user._id}).sort({ createdAt: -1 });
   return sendResponse(res, 200, transactions, false, "Transactions fetched successfully!")
  }catch(error){
    console.log("error from backend all routes while fetching all transaction", error.message)
  }
})

export default router