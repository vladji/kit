import { Alert } from 'react-native';
import { Socket, io } from 'socket.io-client';
import { SERVER_URL } from 'app/api/constants.ts';
import { SocketError } from 'app/providers/Socket/constants.ts';
import { logout } from 'shared/lib/auth/logout.ts';
import { refreshToken } from 'shared/lib/auth/refreshToken.ts';

const URL = SERVER_URL;

let socket: Socket | null = null;

export const connectSocket = (userId: string, token: string | null) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io(URL, {
    auth: token ? { token: `Bearer ${token}` } : undefined,
    transports: ['websocket'],
    reconnection: true,
  });

  socket.on('connect', () => {
    console.log('✅ Connected to socket server');
    socket!.emit('register', userId);
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected from socket server');
  });

  socket.on('connect_error', async (err: Error) => {
    console.log('❌ Socket connect error:', err.message);

    if (err.message === SocketError.TokenExpired) {
      const refreshTokenResponse = await refreshToken();
      const newAccessToken = refreshTokenResponse.data.accessToken;

      socket!.auth = {
        ...(socket!.auth || {}),
        token: `Bearer ${newAccessToken}`,
      };

      socket!.connect();
    }

    if (
      err.message === SocketError.AccessDenied ||
      err.message === SocketError.AdminNotFound ||
      err.message === SocketError.InvalidToken
    ) {
      await logout();
      // TODO: add 'reset app'
    }
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const safeSocket = (): Socket | void => {
  if (!socket) {
    Alert.alert('Socket', 'Server connection error');
    return;
  }
  return socket;
};
