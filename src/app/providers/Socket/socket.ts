import { Alert } from 'react-native';
import { Socket, io } from 'socket.io-client';
import { SERVER_URL } from 'app/api/constants.ts';
import { SocketError } from 'app/providers/Socket/constants.ts';
import { logout } from 'entities/auth/logout.ts';
import { refreshToken } from 'entities/auth/refreshToken.ts';

const URL = SERVER_URL;

let socket: Socket | null = null;

const clearSocket = () => {
  socket?.removeAllListeners();
  socket?.disconnect();
  socket = null;
};

export const connectSocket = (userId: string, token: string | null) => {
  if (socket && socket.connected) {
    return socket;
  }

  if (socket) {
    clearSocket();
  }

  socket = io(URL, {
    auth: token ? { token: `Bearer ${token}` } : undefined,
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  });

  socket.on('connect', () => {
    console.log('✅ Connected to socket server');
    socket!.emit('register', userId);
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ Disconnected from socket server', reason);
    //server ping timeout
  });

  socket.on('connect_error', async (err: Error) => {
    console.log('❌ Socket connect error:', err.message);
    clearSocket();

    if (err.message === SocketError.TokenExpired) {
      await refreshToken();
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

export const safeSocket = (): Socket | void => {
  if (!socket) {
    Alert.alert('Socket', 'Server connection error');
    return;
  }
  return socket;
};
