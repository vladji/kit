import { REACT_SERVER_URL } from '@env';

//172.20.10.3
//192.168.1.36
export const SERVER_URL = __DEV__
  ? 'http://192.168.1.36:3001'
  : REACT_SERVER_URL;
export const API_URL = `${SERVER_URL}/api`;

export const QUERY_KEYS = {
  GET_SUPPORT_ALL_CLIENT_CHATS: 'get_support_all_client_chats',
  GET_SUPPORT_ALL_STORE_CHATS: 'get_support_all_store_chats',
  FETCH_MEMBER_CHATS: 'fetch_member_chats',
  FETCH_LATEST_MESSAGES: 'fetch_latest_messages',
  FETCH_MESSAGES_AROUND: 'fetch_messages_around',
};

export enum STATUS {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  CLIENT_ERRORS = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE = 422,
  SERVER_ERRORS = 500,
}
