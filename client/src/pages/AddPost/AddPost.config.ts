import { formatDatePicker } from '@/utils/formatDate.util';
import { Post } from '@shared/types/post.type';
import * as yup from 'yup';

export type AddPostProps = {
  isOpen: boolean;
  close: () => void;
  post?: Post;
};

export type AddPostFormType = Omit<
  Post,
  'createdAt' | '_id' | 'user' | 'comments' | 'likes' | 'when' | 'image'
> & { when: string; image?: File | null; imagePath?: string };

export type LocationRecord = {
  _id: number;
  טבלה: string;
  סמל_ישוב: number;
  שם_ישוב: string;
  שם_ישוב_לועזי: string;
  סמל_נפה: number;
  שם_נפה: string;
  סמל_לשכת_מנא: number;
  לשכה: string;
  סמל_מועצה_איזורית: number;
  שם_מועצה: string;
};

export const createAddPostSchema = (): yup.ObjectSchema<AddPostFormType> =>
  yup.object({
    caption: yup.string().required(),
    sportType: yup.string().required(),
    location: yup.string().required(),
    when: yup.string().required(),
    image: yup
      .mixed<File>()
      .when('imagePath', {
        is: (imagePath?: string) => !imagePath,
        then: () => yup.mixed<File>().required(),
        otherwise: () => yup.mixed<File>().notRequired().nullable(),
      })
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
    imagePath: yup.string(),
  });

export const postDefaultValues = {
  caption: '',
  sportType: '',
  location: '',
  when: formatDatePicker(new Date()),
  image: null,
};

export const getPostValues = (post?: Post) => {
  if (post)
    return {
      caption: post.caption,
      sportType: post.sportType,
      location: post.location,
      when: formatDatePicker(post.when),
      image: null,
      imagePath: post.image,
    };
  return postDefaultValues;
};
