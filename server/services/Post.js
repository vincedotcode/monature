import Post from '../models/Post.js';
import CommunityGroup from '../models/CommunityGroup.js';
import User from '../models/User.js';

// Add a new post to a community group
const addPost = async (postData, communityGroupId, userId) => {
    const communityGroup = await CommunityGroup.findById(communityGroupId);
    if (!communityGroup) {
        throw new Error('Community group not found');
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const post = new Post({
        ...postData,
        communityGroup: communityGroupId,
        createdBy: userId,
    });

    await post.save();
    return post;
};

// Get all posts for a community group
const getPostsByCommunityGroup = async (communityGroupId) => {
    const posts = await Post.find({ communityGroup: communityGroupId }).populate('createdBy', 'name email');
    return posts;
};

// Delete a post
const deletePost = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }

    if (post.createdBy.toString() !== userId) {
        throw new Error('Only the creator can delete this post');
    }

    await post.remove();
    return post;
};

export default {
    addPost,
    getPostsByCommunityGroup,
    deletePost,
};
