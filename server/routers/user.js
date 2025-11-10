import sendResponse from "../helpers/sendResponse.js";
import User from "../Models/User.js";
import express from "express";
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import authenticateUser from "../middlewares/authentication.js";
import jwt from "jsonwebtoken";

dotenv.config()
const router = express.Router();

// email sender
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email and password", email, password);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");


    const alreadySignup = await User.findOne({ email: email });

    if (alreadySignup)
      return sendResponse(
        res,
        409,
        null,
        true,
        "This email is already registered, try with a different email."
      );

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const user = new User({
      email,
      password,
      isVerified: false,
      verificationCode,

    });

    await user.save();

    // Send verification code
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your HealthMate verification code",
      text: `Your HealthMate verification code is ${verificationCode}`,
    });

   
    sendResponse(res, 201, user, false, "Verification code sent to your email");
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
    console.log("Signup error:", error.message);
  }
});

export default router;



// verify code

router.post("/verify", async (req, res) => {
  const { verificationCode } = req.body
  if (!verificationCode) return sendResponse(res, 400, null, true, "Verification code not provided!")
  const user = await User.findOne({ verificationCode: verificationCode })
  if (!user) return sendResponse(res, 404, null, true, "Incorrect verification code!")
  if (user.isVerified == true) return sendResponse(res, 409, null, true, "User is Already Verified!")

  user.isVerified = true
  await user.save()
  sendResponse(res, 200, null, false, "User Verfied Successfully!")
  
})

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email }).lean()
    if (!user) {
      return sendResponse(res, 404, null, true, "Email is not registered!")
    }
    if (user.password !== password) {
      return sendResponse(res, 401, null, true, "Incorrect Password!")
    }
    const token = jwt.sign(user, process.env.AUTH_SECRET)

    console.log("token=> ", token);
    console.log("user=>", user)
    sendResponse(res, 200, { user, token }, false, "User logged in successfully!")
  } catch (error) {
    return sendResponse(res, 500, null, true, error.message)
  }


})



// getting user data login data!!!
router.get("/myInfo", authenticateUser, async (req,res)=>{
    try{
        const user = await User.findOne({_id: req.user._id})
    sendResponse(res, 200, user, false, "User data fetched successfully")
    }catch(error){
        console.log("error from myInfo api in user file=> ", error)
        sendResponse(res, 500, null, true, "Something went wrong while getting user info!")
    }

})



