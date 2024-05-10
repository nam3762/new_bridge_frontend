// src/api/chat.ts
import axios from 'axios';
import { ChatMessage, ChatRoom } from '../types';

const BASE_URL = 'http://172.21.116.60:8080';

export const getChatRooms = async (userId: number): Promise<{ data: ChatRoom[] }> => {
  const response = await axios.get(`${BASE_URL}/chat/all/${userId}`);
  return response.data;
};

export const getChatMessages = async (roomId: string): Promise<{ data: ChatMessage[] }> => {
  const response = await axios.get(`${BASE_URL}/chat/enter/${roomId}`);
  return response.data;
};

export const sendMessage = async (message: ChatMessage) => {
  await axios.post(`${BASE_URL}/chat/send`, message);
};
