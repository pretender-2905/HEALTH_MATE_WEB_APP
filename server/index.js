import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import sendResponse from './helpers/sendResponse'


const PORT = 4000
dotenv.config()
const app = express()
app.use(cors()) 
app.use(express.json())

app.get("/", (req,res)=>{
    sendResponse(res, 201, false, "Backend Running")
})

app.listen(PORT, `Server is Ruuing on https://localhost:4000`)





