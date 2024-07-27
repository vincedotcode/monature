import authService from '../services/Auth.js';

const registerUser = async (req, res) => {
    try {
        const { user, token } = await authService.register(req.body);
        res.status(201).json({ message: "User created successfully", user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        res.json({ message: "User logged in successfully", user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await authService.getUserById(req.params.id);
        res.json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    registerUser,
    loginUser,
    getUserById,
};
