import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import sendResponse from './helpers/sendResponse.js'
import userRoutes from './routers/user.js'
import transactionRoutes from './routers/transaction.js'
dotenv.config()
const PORT =  4000 

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://extraordinary-sunburst-dfe2f0.netlify.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())

app.get("/", (req,res)=>{
    sendResponse(res, 201, null,  false, "Backend is Running perfectly!")
})

mongoose.connect(process.env.MONGODBURI)
.then(()=> console.log("Mongo Db is connected Successfully!"))
.catch((error)=> console.log("Error while connecting MONGO DB", error.message))

app.use("/user", userRoutes)
app.use("/transaction", transactionRoutes)

app.listen(PORT, ()=> {
    console.log(`Server is Running on http://localhost:${PORT}`)
})