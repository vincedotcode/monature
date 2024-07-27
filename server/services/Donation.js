import Donation from '../models/Donation.js';
import stripe from 'stripe';


const Stripe = stripe(process.env.STRIPE_SECRET_KEY);

// Add a new donation
const addDonation = async (donationData) => {
    const donation = new Donation({
        ...donationData,
        amountToBeDonated: donationData.amount,
    });

    await donation.save();
    return donation;
};

// Get all donations
const getAllDonations = async () => {
    const donations = await Donation.find().populate('donors.userId', 'name email');
    return donations;
};

// Get a donation by ID
const getDonationById = async (donationId) => {
    const donation = await Donation.findById(donationId).populate('donors.userId', 'name email');
    if (!donation) {
        throw new Error('Donation not found');
    }

    return donation;
};

// Delete a donation by ID
const deleteDonation = async (donationId) => {
    const donation = await Donation.findByIdAndDelete(donationId);
    if (!donation) {
        throw new Error('Donation not found');
    }

    return donation;
};

// Add a donation from a user
const addUserDonation = async (donationId, userId, amount) => {
    const donation = await Donation.findById(donationId);
    if (!donation) {
        throw new Error('Donation not found');
    }

    donation.donationsReceived += amount;
    donation.donors.push({
        userId: userId,
        amountDonated: amount,
    });

    await donation.save();
    return donation;
};


const DonationPayment = async (email, amount) => {
    const MUR_TO_USD_CONVERSION_RATE = 0.025;

    const amountInUSD = Math.round(amount * MUR_TO_USD_CONVERSION_RATE * 100); 



    try {
        const session = await Stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Donation',
                        },
                         unit_amount: amountInUSD,
                    },
                    quantity: 1,
                },
            ],
            customer_email: email,
            mode: 'payment',
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        });

        return session.url;
    } catch (error) {
        throw new Error('Failed to create checkout session: ' + error.message);
    }
};

export default {
    addDonation,
    getAllDonations,
    getDonationById,
    deleteDonation,
    addUserDonation,
    DonationPayment,
};
