import { Alert } from 'react-native';
import { REACT_API_KEY } from '@env';
import axios from 'axios';
import { API_URL } from 'app/api/constants.ts';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': REACT_API_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const errorStatus = error.response?.status || '';
    const errorStatusText = error.response?.statusText || '';
    const responseMessage =
      error.response?.data?.message || error.toString() || '';

    const errorMessage = `${errorStatus}
    \n${errorStatusText || ''}
    \n${responseMessage}`;

    Alert.alert('API Error', errorMessage);

    return Promise.reject(error);
  },
);

export default api;
