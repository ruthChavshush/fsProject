import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const ALLOWED_FILE_TYPES = ['JPG', 'JPEG', 'PNG'];
const multerTypeCheck = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (!file.originalname) {
    cb(new Error('File name is missing'));
  }

  const typeAllowed = ALLOWED_FILE_TYPES.some(fileType =>
    file.originalname.toUpperCase().endsWith(fileType)
  );

  if (!typeAllowed) {
    cb(new Error('File type is not allowed'));
  }

  cb(null, typeAllowed);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ fileFilter: multerTypeCheck, storage });

export default upload;
