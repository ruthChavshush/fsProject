import { Router } from 'express';
import { signUp, updateUser } from '../controllers/userController';
import { authanticate } from '../middlewares/auth.middleware';
import upload from '../middlewares/file.middleware';

const router = Router();

router.post('/', signUp);
router.put('/', authanticate, upload.single('image'), updateUser);

export default router;
