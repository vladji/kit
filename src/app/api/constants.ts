import { REACT_SERVER_URL } from '@env';

export const SERVER_URL = __DEV__
  ? 'http://192.168.1.36:3001'
  : REACT_SERVER_URL;
export const API_URL = `${SERVER_URL}/api`;

export const QUERY_KEYS = {
  GET_MESSAGES: 'get_messages',
};
