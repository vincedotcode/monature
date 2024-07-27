import forumPostService from '../services/Post.js';

const addPost = async (req, res) => {
    try {
        const { userId } = req.body; // Assuming userId is sent in the request body
        const post = await forumPostService.addPost(req.body, req.params.groupId, userId);
        res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPostsByCommunityGroup = async (req, res) => {
    try {
        const posts = await forumPostService.getPostsByCommunityGroup(req.params.groupId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { userId } = req.body; // Assuming userId is sent in the request body
        const post = await forumPostService.deletePost(req.params.id, userId);
        res.status(200).json({ message: "Post deleted successfully", post });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    addPost,
    getPostsByCommunityGroup,
    deletePost,
};
