// src/api/ChatApi.ts
import axios from 'axios';

const BASE_URL = 'http://172.21.116.60:8080';

export const getAllUserChats = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/chat/all/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return { code: -1, message: 'Error fetching chats', data: [] };
  }
};

export const createChatRoom = async (hostId: number, guestId: number, roomName: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/chat/create`, {
      hostId,
      guestId,
      roomName,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating chat room:', error);
    return { code: -1, message: 'Error creating chat room', data: null };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return { code: -1, message: 'Error fetching users', data: [] };
  }
};
