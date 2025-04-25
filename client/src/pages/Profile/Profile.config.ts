import * as yup from 'yup';

export type ProfileForm = {
  name: string;
  image?: File | null;
};

export const createProfileSchema = (): yup.ObjectSchema<ProfileForm> =>
  yup.object({
    name: yup.string().required(),
    image: yup
      .mixed<File>()
      .nullable()
      .test(
        'fileSize',
        'File too large',
        value => !value || (value && value.size <= 1024 * 1024 * 5) // 5MB limit
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        value => !value || (value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
      ),
  });
