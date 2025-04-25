import * as yup from 'yup';
import { UserForm } from './Signup.config';

export const createUserSchema = (): yup.ObjectSchema<UserForm> =>
  yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .required()
      .test('passwords-match', 'Passwords must match', function () {
        return this.parent.password === this.parent.confirmPassword;
      }),
  });
