import bcrypt from 'bcrypt';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { signUp, updateUser } from '../controllers/userController';
import User from '../models/userModel';

jest.mock('../models/userModel');

describe('User Controller', () => {
  describe('signUp', () => {
    it('should create a new user', async () => {
      const req = mockRequest({
        body: {
          user: {
            email: 'test@example.com',
            password: 'password123',
          },
        },
      });

      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

      const userExists = null;
      (User.findOne as jest.Mock).mockResolvedValue(userExists);

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(req.body.user.password, salt);
      const newUser = {
        _id: '123',
        email: req.body.user.email,
        password: encryptedPassword,
      };
      User.prototype.save.mockResolvedValue(newUser);

      await signUp(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.user.email });
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should return an error if user already exists', async () => {
      const req = mockRequest({
        body: {
          user: {
            email: 'test@example.com',
            password: 'password123',
          },
        },
      });

      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

      const userExists = {
        _id: '123',
        email: req.body.user.email,
        password: 'hashedPassword',
      };
      (User.findOne as jest.Mock).mockResolvedValue(userExists);

      await signUp(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.user.email });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });

    it('should return an error if an unknown error occurs', async () => {
      const req = mockRequest({
        body: {
          user: {
            email: 'test@example.com',
            password: 'password123',
          },
        },
      });

      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

      (User.findOne as jest.Mock).mockResolvedValue(new Error('Unknown error')); //FIXME:

      await signUp(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.user.email });
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('updateUser', () => {
    it('should update the user', async () => {
      const req = mockRequest({
        body: {
          _id: '123',
          email: 'test@example.com',
          password: 'password123',
        },
        file: {
          path: '/path/to/image.jpg',
        },
      });

      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      });

      const updatedUser = mockResponse({
        _id: '123',
        email: req.body.email,
        password: req.body.password,
        image: req.file!.path,
      });
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);

      await updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(req.body._id, req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(updatedUser);
    });

    it('should return an error if user is not found', async () => {
      const req = mockRequest({
        body: {
          _id: '123',
          email: 'test@example.com',
          password: 'password123',
        },
        file: {
          path: '/path/to/image.jpg',
        },
      });

      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      });

      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(req.body._id, req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('User not found');
    });

    it('should return an error if an unknown error occurs', async () => {
      const req = mockRequest({
        body: {
          _id: '123',
          email: 'test@example.com',
          password: 'password123',
        },
        file: {
          path: '/path/to/image.jpg',
        },
      });

      const res = mockResponse({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

      (User.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Unknown error'));

      await updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(req.body._id, req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unknown error' });
    });
  });
});
