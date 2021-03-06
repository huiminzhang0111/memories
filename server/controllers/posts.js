// I am going to create all handlers for our routes
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPost = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted!' })

}


export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    
    const post = await PostMessage.findById(_id)
    const updatedPost = await PostMessage.findByIdAndUpdate( _id, { likeCount: post.likeCount + 1 }, { new: true })

    res.json(updatedPost)
}

