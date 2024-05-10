// src/api/UserApi.ts
import axios from 'axios';

const BASE_URL = 'http://172.21.116.60:8080';

export const signIn = async (email: string, pwd: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email,
      pwd,
    });
    return response.data;
  } catch (error) {
    return { code: -1, message: 'Unauthorized' };
  }
};

export const signUp = async (userId: number, email: string, userPwd: string, userName: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, {
      userId,
      email,
      userPwd,
      userName,
    });
    return response.data;
  } catch (error) {
    return { code: -1, message: 'Signup Error' };
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    return { code: -1, message: 'Get User Error' };
  }
};
