import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import sendResponse from './helpers/sendResponse.js'
import userRoutes from './routers/user.js'
dotenv.config()
const PORT =  4000 

const app = express()
app.use(cors()) 
app.use(express.json())

app.get("/", (req,res)=>{
    sendResponse(res, 201, null,  false, "Backend is Running perfectly!")
})

mongoose.connect(process.env.MONGODBURI)
.then(()=> console.log("Mongo Db is connected Successfully!"))
.catch((error)=> console.log("Error while connecting MONGO DB", error.message))


app.use("/user", userRoutes)
app.listen(PORT, ()=> {
    console.log(`Server is Running on http://localhost:${PORT}`)
})





