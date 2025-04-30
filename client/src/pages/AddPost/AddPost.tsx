import locationApi from '@/api/locationApi';
import AppLogo from '@/assets/AppLogo.png';
import ControlledAutoComplete from '@/components/Controlled/ControlledAutoComplete';
import ControlledFileField from '@/components/Controlled/ControlledFileField';
import ControlledTextField from '@/components/Controlled/ControlledTextField';
import AuthContext from '@/contexts/AuthContext';
import { useUpsertPost } from '@/hooks/post/useUpsertPost';
import { handleFileChange } from '@/utils/handleFileChange';
import { onError } from '@/utils/onError';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AddPostFormType,
  AddPostProps,
  createAddPostSchema,
  getPostValues,
  LocationRecord,
} from './AddPost.config';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const AddPost: React.FC<AddPostProps> = ({ isOpen, close, post }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { currentUser } = useContext(AuthContext);
  const TITLE = post ? 'Edit Post' : 'Add Post';
  const postValues = useMemo(() => getPostValues(post), [post]);
  const [locations, setLocations] = useState<string[]>([]);

  const getLocations = async () => {
    const response = await locationApi.get('', {});
    const cities = response.data.result.records.map(
      (record: LocationRecord) => record.שם_ישוב_לועזי
    );
    setLocations(cities);
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddPostFormType>({
    resolver: yupResolver(createAddPostSchema()),
    defaultValues: postValues,
  });

  const resetForm = () => {
    reset();
    setImagePreview(null);
    close();
  };

  const { mutate: upsertPost } = useUpsertPost(resetForm, onError);

  const onSubmit = (data: AddPostFormType) => {
    upsertPost({
      ...data,
      user: currentUser!._id,
      image: data.image!,
      when: new Date(data.when),
      _id: post?._id,
    });
  };

  useEffect(() => {
    setImagePreview(post?.image ? `${VITE_BASE_URL}/${post.image}` : null);
  }, [post]);

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <Dialog open={isOpen} onClose={resetForm}>
      <DialogTitle color="primary">{TITLE}</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          {imagePreview && (
            <Grid item container sx={{ justifyContent: 'center' }}>
              <Box
                component="img"
                src={imagePreview || AppLogo}
                sx={{ width: '20vw', maxHeight: '45vh' }}
              />
            </Grid>
          )}
          <Grid item container sx={{ justifyContent: 'center' }}>
            <ControlledFileField
              name="image"
              fileInputRef={fileInputRef}
              handleFileChangeParent={event =>
                handleFileChange({ event, setValue, setImagePreview })
              }
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={6}>
              <ControlledTextField
                name="caption"
                label="Caption"
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="sportType"
                label="Sport Type"
                control={control}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={6}>
              <ControlledAutoComplete
                name="location"
                label="Where"
                options={locations}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="when"
                label="When"
                type="datetime-local"
                control={control}
                errors={errors}
                textfieldProps={{
                  InputLabelProps: { shrink: true },
                  inputProps: { inputprops: { max: new Date().toISOString().slice(0, 16) } },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={resetForm}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit(onSubmit)}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPost;
