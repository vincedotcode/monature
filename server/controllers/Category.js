import categoryService from '../services/Category.js';

const addCategory = async (req, res) => {
    try {
        const category = await categoryService.addCategory(req.body);
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await categoryService.deleteCategory(req.params.id);
        res.status(200).json({ message: "Category deleted successfully", category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    addCategory,
    getAllCategories,
    deleteCategory,
};
