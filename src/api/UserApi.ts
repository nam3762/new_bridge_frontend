// src/api/UserApi.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.21.116.60:8080', // 백엔드 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const response = await api.post('/user/signup', {
      userId: 0,
      email,
      userPwd: password,
      userName: name,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { code: -1, message: 'Unknown Error' };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post('/user/login', {
      email,
      pwd: password,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { code: -1, message: 'Unknown Error' };
  }
};

export const getUserById = async (userId: number) => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { code: -1, message: 'Unknown Error' };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/user/all');
    return response.data;
  } catch (error) {
    return error.response?.data || { code: -1, message: 'Unknown Error' };
  }
};
