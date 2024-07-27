import donationService from '../services/Donation.js';

const addDonation = async (req, res) => {
    try {
        const donation = await donationService.addDonation(req.body);
        res.status(201).json({ message: "Donation created successfully", donation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllDonations = async (req, res) => {
    try {
        const donations = await donationService.getAllDonations();
        res.status(200).json(donations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getDonationById = async (req, res) => {
    try {
        const donation = await donationService.getDonationById(req.params.id);
        res.status(200).json(donation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteDonation = async (req, res) => {
    try {
        const donation = await donationService.deleteDonation(req.params.id);
        res.status(200).json({ message: "Donation deleted successfully", donation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addUserDonation = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const donation = await donationService.addUserDonation(req.params.id, userId, amount);
        res.status(200).json({ message: "Donation added successfully", donation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createDonationPayment = async (req, res) => {
    try {
        const { email, amount } = req.body;
        const paymentUrl = await donationService.DonationPayment(email, amount);
        res.status(200).json({ url: paymentUrl });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    addDonation,
    getAllDonations,
    getDonationById,
    deleteDonation,
    addUserDonation,
    createDonationPayment,
};
