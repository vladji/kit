import { Socket, io } from 'socket.io-client';
import { SERVER_URL } from 'app/api/constants.ts';

const URL = SERVER_URL;

let socket: Socket;

export const connectSocket = (userId: string) => {
  socket = io(URL, {
    transports: ['websocket'],
    reconnection: true,
  });

  socket.on('connect', () => {
    console.log('✅ Connected to socket server');
    socket.emit('register', userId);
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected from socket server');
  });
};

export const getSocket = () => socket;
