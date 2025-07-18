import { REACT_API_URL } from '@env';

export const API_URL = __DEV__ ? 'http://172.20.10.3:3001/api' : REACT_API_URL;

export const QUERY_KEYS = {
  GET_MESSAGES: 'get_messages',
};
