// src/api/ChatWebSocket.ts
import { WebSocket } from 'ws';
import { ChatMessage } from '../models/ChatMessage';
import { getAllUserChats } from './ChatApi';

const BASE_WS_URL = 'ws://172.21.116.60:8080/ws/chat';

export class ChatWebSocket {
  private socket: WebSocket | null = null;
  private chatRooms: Map<string, ChatMessage[]> = new Map();
  private onUpdateRooms: () => void = () => {};
  private onNewMessage: (roomId: string, message: ChatMessage) => void = () => {};

  constructor(userId: number) {
    this.socket = new WebSocket(`${BASE_WS_URL}?userId=${userId}`);

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message === 'new room') {
        this.onUpdateRooms();
      } else {
        const message: ChatMessage = {
          key: data.key,
          roomId: data.roomId,
          messageId: data.messageId,
          userId: data.userId,
          userName: data.userName,
          message: data.message,
          timestamp: new Date(data.timestamp),
        };

        const roomMessages = this.chatRooms.get(data.roomId) || [];
        roomMessages.push(message);
        this.chatRooms.set(data.roomId, roomMessages);
        this.onNewMessage(data.roomId, message);
      }
    };

    this.socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    this.socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
      this.socket = null;
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(roomId: string, message: string, userId: number, userName: string) {
    if (this.socket) {
      const chatMessage = {
        roomId,
        userId,
        userName,
        message,
      };
      this.socket.send(JSON.stringify(chatMessage));
    }
  }

  setUpdateRoomsCallback(callback: () => void) {
    this.onUpdateRooms = callback;
  }

  setNewMessageCallback(callback: (roomId: string, message: ChatMessage) => void) {
    this.onNewMessage = callback;
  }

  async fetchChatRooms(userId: number) {
    const response = await getAllUserChats(userId);
    if (response.code === 0 && response.data) {
      response.data.forEach((room: { roomId: string; roomName: string }) => {
        this.chatRooms.set(room.roomId, []);
      });
    }
  }

  getChatMessages(roomId: string): ChatMessage[] {
    return this.chatRooms.get(roomId) || [];
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
