import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type:{
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    reason:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
}, {timestamps: true});

const Transaction = mongoose.model("Transaction", TransactionSchema );
export default Transaction;