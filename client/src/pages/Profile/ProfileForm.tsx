import ControlledFileField from '@/components/Controlled/ControlledFileField';
import ControlledTextField from '@/components/Controlled/ControlledTextField';
import { useUpdateUser } from '@/hooks/user/useUpdateUser';
import {
  ProfileForm as ProfileFormType,
  createProfileSchema,
} from '@/pages/Profile/Profile.config';
import { handleFileChange } from '@/utils/handleFileChange';
import { onError } from '@/utils/onError';
import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import SaveButton from '@mui/icons-material/Save';
import { Avatar, Grid, IconButton } from '@mui/material';
import { User } from '@shared/types/user.type';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

type ProfileFormProps = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ currentUser, setCurrentUser }) => {
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    currentUser?.image ? `${VITE_BASE_URL}/${currentUser.image}` : ''
  );

  const onSuccess = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setIsEdit(false);
  };

  const { mutate: updateUser } = useUpdateUser(onSuccess, onError);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ProfileFormType>({
    resolver: yupResolver(createProfileSchema()),
    defaultValues: { name: currentUser?.name || '', image: null },
  });

  const onSubmit = async (data: ProfileFormType) => {
    const user = {
      _id: currentUser?._id || '',
      name: data.name,
      email: currentUser?.email || '',
      image: data.image!,
    };
    updateUser(user);
  };

  return (
    <Grid container sx={{ justifyContent: 'center', alignItems: 'center', padding: '3vh' }}>
      <Grid
        item
        xs={isEdit ? 2 : 1}
        sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      >
        <Avatar src={imagePreview || ''} sx={{ width: '6vw', height: '6vw' }} />
        {isEdit && (
          <ControlledFileField
            name="image"
            fileInputRef={fileInputRef}
            handleFileChangeParent={event => handleFileChange({ event, setValue, setImagePreview })}
            control={control}
            errors={errors}
          />
        )}
      </Grid>
      <Grid item xs={isEdit ? 7 : 8}>
        <ControlledTextField
          name="name"
          label="Name"
          control={control}
          errors={errors}
          textfieldProps={{
            disabled: !isEdit,
          }}
        />
      </Grid>
      <Grid item xs={1} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        {!isEdit ? (
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleSubmit(onSubmit)}>
            <SaveButton />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileForm;
