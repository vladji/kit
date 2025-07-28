import { REACT_SERVER_URL } from '@env';

//172.20.10.3
export const SERVER_URL = __DEV__
  ? 'http://172.20.10.3:3001'
  : REACT_SERVER_URL;
export const API_URL = `${SERVER_URL}/api`;

export const QUERY_KEYS = {
  GET_USER_BY_ID: 'GET_USER_BY_ID',
  GET_SUPPORT_ALL_CLIENT_CHATS: 'get_support_all_client_chats',
  GET_MEMBER_CHATS: 'get_member_chats',
  GET_MEMBER_SUPPORT_CHATS: 'get_member_support_chats',
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
