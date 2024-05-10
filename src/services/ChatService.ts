// src/services/ChatService.ts
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { ChatMessage } from '../models/ChatMessage';

class ChatService {
  static async findAllRoomsByUserId(userId: number): Promise<any[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/all/${userId}`);
      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error('Error fetching chat rooms');
    }
  }

  static async getMessages(roomId: string): Promise<ChatMessage[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/enter/${roomId}`);
      if (response.data.code === 200) {
        return response.data.data.map((message: any) => ({
          key: message.key,
          roomId: message.roomId,
          messageId: message.messageId,
          userId: message.userId,
          userName: message.userName,
          message: message.message,
          timestamp: new Date(message.timestamp),
        }));
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error('Error fetching messages');
    }
  }
}

export default ChatService;
