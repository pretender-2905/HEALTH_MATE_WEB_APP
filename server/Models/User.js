import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        trim: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },
    password: {
        required: true,
        minlength: 6,
        type: String,
    },

    isVerified:{
        type: Boolean,
        default: false,
    },

    verificationCode:{
        type: String,
    }
    
},
    {
        timestamps: true
    }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User