import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    credits: number;
    paymentId: string;
    orderId: string;
    status: "pending" | "success" | "failed"; 
    createdAt: Date;
    updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        credits: {
            type: Number,
            required: true,
        },
        paymentId: {
            type: String,
        },
        orderId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", transactionSchema);
