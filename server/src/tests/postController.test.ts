import { Post as PostType } from '@shared/types/post.type';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { v4 as uuidv4 } from 'uuid';
import {
  commentPost,
  deletePost,
  getMyPosts,
  getPosts,
  likePost,
  upsertPost,
} from '../controllers/postController';
import Post from '../models/postModel';
import User from '../models/userModel';

jest.mock('../models/postModel');
jest.mock('../models/userModel');

const posts: PostType[] = [
  {
    _id: '123',
    caption: 'Test Post 1',
    image: 'path/to/image.jpg',
    createdAt: new Date(),
    user: {
      _id: '123',
      name: 'John Doe',
      email: '',
    },
    comments: [],
    likes: [],
    when: new Date(),
    sportType: 'Test Post 1',

    location: 'Test Location 1',
  },
  {
    _id: '456',
    caption: 'Test Post 2',
    image: 'path/to/image.jpg',
    createdAt: new Date(),
    user: {
      _id: '123',
      name: 'Jane Doe',
      email: '',
    },
    comments: [],
    likes: [],
    when: new Date(),
    sportType: 'Test Post 2',

    location: 'Test Location 2',
  },
];

describe('Post Controller', () => {
  describe('upsertPost', () => {
    it('should create a new post', async () => {
      const req = mockRequest({
        body: {
          _id: '123',
          title: 'Test Post',
          content: 'This is a test post',
        },
        file: {
          path: '/path/to/image.jpg',
        },
      });

      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

      const postData = {
        _id: req.body._id || uuidv4(),
        title: req.body.title,
        content: req.body.content,
        image: req.file!.path,
      };

      (Post.findOneAndUpdate as jest.Mock).mockResolvedValue(postData);

      await upsertPost(req, res);

      expect(Post.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: req.body._id || expect.any(String) },
        postData,
        { new: true, upsert: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(postData);
    });

    it('should handle errors', async () => {
      const req = mockRequest({
        body: {
          _id: '123',
          title: 'Test Post',
          content: 'This is a test post',
        },
        file: {
          path: '/path/to/image.jpg',
        },
      });

      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

      const errorMessage = 'Unknown error occurred';
      (Post.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await upsertPost(req, res);

      expect(Post.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: req.body._id || expect.any(String) },
        expect.any(Object),
        { new: true, upsert: true }
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const req = mockRequest({
        params: {
          id: '123',
        },
      });

      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

      const deletedPost = {
        _id: '123',
        title: 'Test Post',
        content: 'This is a test post',
      };

      (Post.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedPost);

      await deletePost(req, res);

      expect(Post.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post deleted' });
    });

    it('should handle post not found', async () => {
      const req = mockRequest({
        params: {
          id: '123',
        },
      });

      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

      (Post.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await deletePost(req, res);

      expect(Post.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('should handle errors', async () => {
      const req = mockRequest({
        params: {
          id: '123',
        },
      });

      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

      const errorMessage = 'Unknown error occurred';
      (Post.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await deletePost(req, res);

      expect(Post.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('getPosts', () => {
    it('should get all posts', async () => {
      const req = mockRequest({});
      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

      const mockSort = jest.fn().mockReturnThis();
      const mockPopulate = jest.fn().mockReturnThis();
      const mockExec = jest.fn().mockResolvedValue(posts);

      (Post.find as jest.Mock).mockImplementation(() => ({
        sort: mockSort,
        populate: mockPopulate,
        exec: mockExec,
      }));

      await getPosts(req, res);

      expect(Post.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(posts);
    });
  });

  describe('getMyPosts', () => {
    it('should get posts of a specific user', async () => {
      const req = mockRequest({
        user: '123',
      });
      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

      const userId = req.user;

      const mockSort = jest.fn().mockReturnThis();
      const mockPopulate = jest.fn().mockReturnThis();
      const mockExec = jest.fn().mockResolvedValue(posts);

      (Post.find as jest.Mock).mockImplementation(() => ({
        sort: mockSort,
        populate: mockPopulate,
        exec: mockExec,
      }));

      await getMyPosts(req, res);

      expect(Post.find).toHaveBeenCalledWith({ user: userId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(posts);
    });
  });

});
