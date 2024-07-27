import mongoose from "mongoose";
// Define the Donation schema
const donationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    subhead: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    amountToBeDonated: {
        type: Number,
        required: true,
    },
    donationsReceived: {
        type: Number,
        default: 0,
    },
    donors: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        amountDonated: {
            type: Number,
            required: true,
        },
        donatedAt: {
            type: Date,
            default: Date.now,
        },
    }],
}, { timestamps: true });

export default mongoose.model('Donation', donationSchema);