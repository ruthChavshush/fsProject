import { SignUpRequest, User as UserType } from '@shared/types/user.type';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import User from '../models/userModel';
dotenv.config();

export const signUp = async (req: Request, res: Response) => {
  try {
    const userData: SignUpRequest = req.body.user;

    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = encryptedPassword;

    const user = new User(userData);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const user: UserType = req.body;
  if (req.file) user.image = req.file.path;
  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
    if (!updatedUser) return res.status(404).send('User not found');
    return res.status(200).send(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};
