// src/services/UserService.ts
import axios from 'axios';

const API_URL = 'http://172.21.116.60:8080';

interface User {
  userId: number;
  userName: string;
}

class UserService {
  static async getAllUsers(): Promise<User[]> {
    const response = await axios.get(`${API_URL}/user/all`);
    return response.data.data;
  }
}

export default UserService;
