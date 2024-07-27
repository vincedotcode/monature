import communityGroupService from '../services/CommunityGroup.js';

const addCommunityGroup = async (req, res) => {
    try {
        const adminId = req.params.adminId; // Extract admin ID from params
        const communityGroup = await communityGroupService.addCommunityGroup(req.body, adminId);
        res.status(201).json({ message: "Community group created successfully", communityGroup });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllCommunityGroups = async (req, res) => {
    try {
        const communityGroups = await communityGroupService.getAllCommunityGroups();
        res.status(200).json(communityGroups);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCommunityGroup = async (req, res) => {
    try {
        const groupId = req.params.id; // Extract group ID from params
        const communityGroup = await communityGroupService.deleteCommunityGroup(groupId);
        res.status(200).json({ message: "Community group deleted successfully", communityGroup });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addCategoryToGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId; // Extract group ID from params
        const categoryId = req.params.categoryId; // Extract category ID from params
        const communityGroup = await communityGroupService.addCategoryToGroup(groupId, categoryId);
        res.status(200).json({ message: "Category added to community group successfully", communityGroup });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    addCommunityGroup,
    getAllCommunityGroups,
    deleteCommunityGroup,
    addCategoryToGroup,
};
