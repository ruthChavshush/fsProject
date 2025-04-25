import { Router } from 'express';
import { googleLogin, login, logout, refreshToken } from '../controllers/authController';
import { signUp, updateUser } from '../controllers/userController';
import { authanticate } from '../middlewares/auth.middleware';
import upload from '../middlewares/file.middleware';

const router = Router();

router.post('/login', login);
router.post('/refreshToken/:refreshToken', refreshToken);
router.post('/googleLogin', googleLogin);
router.post('/logout', authanticate, logout);

export default router;
