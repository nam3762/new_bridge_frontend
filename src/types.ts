// src/types.ts
export interface ChatRoom {
  roomId: string;
  roomName: string;
}

export interface ChatMessage {
  key: string;
  roomId: string;
  messageId: number;
  userId: number;
  userName: string;
  message: string;
  timestamp: string;
}
