// src/api/ChatApi.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.21.116.60:8080', // 백엔드 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getChatRooms = async (userId: number) => {
  try {
    const response = await api.get(`/chat/rooms/${userId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { code: -1, message: 'Unknown Error' };
  }
};

export const getChatMessages = async (roomId: number) => {
  try {
    const response = await api.get(`/chat/messages/${roomId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { code: -1, message: 'Unknown Error' };
  }
};

export const sendMessage = async (roomId: number, senderId: number, message: string) => {
  try {
    const response = await api.post('/chat/send', {
      roomId,
      senderId,
      message,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { code: -1, message: 'Unknown Error' };
  }
};
