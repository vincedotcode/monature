import Category from '../models/Category.js';


const addCategory = async (categoryData) => {
    const category = new Category({
        ...categoryData,
    });

    await category.save();
    return category;
};


const getAllCategories = async () => {
    const categories = await Category.find();
    return categories;
};


const deleteCategory = async (categoryId) => {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
        throw new Error('Category not found');
    }

    return category;
};

export default {
    addCategory,
    getAllCategories,
    deleteCategory,
};
