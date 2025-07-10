import { REACT_API_URL } from '@env';

export const API_URL = __DEV__ ? 'http://192.168.1.36:3001/api' : REACT_API_URL;
