import { LoginRequest } from '@shared/types/user.type';
import * as yup from 'yup';

export const loginUserSchema = (): yup.ObjectSchema<LoginRequest> =>
  yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });
