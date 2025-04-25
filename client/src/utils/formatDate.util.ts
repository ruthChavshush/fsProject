import { format } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'dd/MM/yyyy HH:mm');
};

export const formatDatePicker = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  console.log("date: " + dateObj + " ");
  const pad = (number: number) => (number < 10 ? '0' + number : number);
  const year = dateObj.getFullYear();
  const month = pad(dateObj.getMonth() + 1);
  const day = pad(dateObj.getDate());
  const hours = pad(dateObj.getHours());
  const minutes = pad(dateObj.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
