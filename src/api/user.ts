// src/api/user.ts
import axios from 'axios';
import { User } from '../types';

const BASE_URL = 'http://172.21.116.60:8080';

export const getAllUsers = async (): Promise<{ data: User[] }> => {
  const response = await axios.get(`${BASE_URL}/user/all`);
  return response.data;
};
