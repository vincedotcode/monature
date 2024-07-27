import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'g889f332';
const jwtExpiresIn = 86400;

const register = async (userData) => {
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
        throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({
        ...userData,
        password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
    }, jwtSecret, { expiresIn: jwtExpiresIn });

    const userObject = user.toObject();
    delete userObject.password;

    return { user: userObject, token };
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
    }, jwtSecret, { expiresIn: jwtExpiresIn });

    const userObject = user.toObject();
    delete userObject.password;

    return { user: userObject, token };
};

const getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

export default {
    register,
    login,
    getUserById,
};
