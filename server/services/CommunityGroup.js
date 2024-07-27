import CommunityGroup from '../models/CommunityGroup.js';
import User from '../models/User.js';
import Category from '../models/Category.js';

const addCommunityGroup = async (groupData, adminId) => {
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== 'admin') {
        throw new Error('Only admins can create community groups');
    }

    const category = await Category.findById(groupData.category);
    if (!category) {
        throw new Error('Category not found');
    }

    const communityGroup = new CommunityGroup({
        ...groupData,
        createdBy: adminId,
    });

    await communityGroup.save();
    return communityGroup;
};

// Get all community groups
const getAllCommunityGroups = async () => {
    return await CommunityGroup.find().populate('category', 'name description');
};

// Delete a community group
const deleteCommunityGroup = async (groupId) => {
    const communityGroup = await CommunityGroup.findByIdAndDelete(groupId);
    if (!communityGroup) {
        throw new Error('Community group not found');
    }

    return communityGroup;
};

// Add a category to a community group
const addCategoryToGroup = async (groupId, categoryId) => {
    const communityGroup = await CommunityGroup.findById(groupId);
    if (!communityGroup) {
        throw new Error('Community group not found');
    }

    const category = await Category.findById(categoryId);
    if (!category) {
        throw new Error('Category not found');
    }

    communityGroup.category = category._id;
    await communityGroup.save();

    return communityGroup;
};

export default {
    addCommunityGroup,
    getAllCommunityGroups,
    deleteCommunityGroup,
    addCategoryToGroup,
};
