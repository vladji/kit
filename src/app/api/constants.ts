import { REACT_SERVER_URL } from '@env';

export const SERVER_URL = __DEV__
  ? 'http://192.168.1.36:3001'
  : REACT_SERVER_URL;
export const API_URL = `${SERVER_URL}/api`;

export const QUERY_KEYS = {
  GET_ADMIN_SUPPORT_ALL_CHATS: 'get_admin_support_all_chats',
  GET_MEMBER_ALL_CHATS: 'get_member_all_chats',
  GET_MESSAGES: 'get_messages',
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
