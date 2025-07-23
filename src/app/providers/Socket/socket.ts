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
      try {
        const refreshTokenResponse = await refreshToken();
        const newAccessToken = refreshTokenResponse.data.accessToken;

        socket!.auth = {
          ...(socket!.auth || {}),
          token: `Bearer ${newAccessToken}`,
        };

        socket!.connect();
      } catch (refreshErr) {
        console.error('🔒 Refresh token failed for socket:', refreshErr);
      }
    }

    if (
      err.message === SocketError.AccessDenied ||
      err.message === SocketError.AdminNotFound ||
      err.message === SocketError.InvalidToken
    ) {
      await logout();
    }
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
