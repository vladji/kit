import { Alert } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from 'entities/auth/types.ts';

export const getTokenPayload = (token: string) => {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    Alert.alert('Token', 'token decode error');
  }
};
