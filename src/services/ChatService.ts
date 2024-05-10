// src/services/ChatService.ts
import axios from 'axios';

class ChatService {
  private static instance: ChatService;
  private constructor() {}

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  async createChatRoom(hostId: number, guestId: number, roomName: string): Promise<any> {
    try {
      const response = await axios.post('http://172.21.116.60:8080/chat/create', {
        hostId,
        guestId,
        roomName
      });

      if (response.status === 200 && response.data.code === 200) {
        return response.data; // 성공적으로 채팅방이 생성된 경우
      } else {
        throw new Error(`Failed to create chat room with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Create chat room error:', error);
      throw error; // 오류를 상위 호출자에게 전달
    }
  }
}

export default ChatService.getInstance();