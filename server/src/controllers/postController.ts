import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Post from '../models/postModel';
import User from '../models/userModel';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const upsertPost = async (req: MulterRequest, res: Response) => {
  try {
    const postData = req.body;
    if (req.file) {
      postData.image = req.file.path;
    }

    const filter = { _id: req.body._id || uuidv4() };

    const post = await Post.findOneAndUpdate(filter, postData, {
      new: true,
      upsert: true,
    });

    res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const filter: Record<string, any> = {};

    // Loop through all query parameters
    for (const key in req.query) {
      const value = req.query[key];
    
      if (typeof value === 'string') {
        // For string fields, do case-insensitive "contains" search using regex
        filter[key] = { $regex: value, $options: 'i' };
      } else {
        // For non-string fields (arrays, numbers?), do exact match
        filter[key] = value;
      }
    }    const posts = await Post.find(filter)
      .sort({ ['when']: -1 })
      .populate('user')
      .exec();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};

export const getMyPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    const posts = await Post.find({ user: userId })
      .sort({ ['createdAt']: -1 })
      .populate('user')
      .exec();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    if (post.likes.includes(req.user)) post.likes = post.likes.filter(id => id !== req.user);
    else post.likes.push(req.user);

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};

export const commentPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const comment = {
      content: req.body.comment,
      createdAt: new Date(),
      userId: user._id,
      userName: user.name,
    };
    post.comments.push(comment);

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};
