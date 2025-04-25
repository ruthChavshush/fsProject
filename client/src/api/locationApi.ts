import axios from 'axios';

const { VITE_LOCATIONS_URL, VITE_LOCATIONS_API_ID } = import.meta.env;

const locationApi = axios.create({
  baseURL: `${VITE_LOCATIONS_URL}`,
  responseType: 'json',
  params: { resource_id: VITE_LOCATIONS_API_ID },
});

export default locationApi;
