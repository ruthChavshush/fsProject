import { UseFormSetValue } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-explicit-any */
type handleFileChangeProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  setValue: UseFormSetValue<any>;
  setImagePreview: (value: React.SetStateAction<string | null>) => void;
};

export const handleFileChange = ({ event, setValue, setImagePreview }: handleFileChangeProps) => {
  const file = event.target.files?.[0] || null;
  setValue('image', file);
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  } else {
    setImagePreview(null);
  }
};
