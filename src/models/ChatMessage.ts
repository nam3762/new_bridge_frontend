// src/models/ChatMessage.ts
export interface ChatMessage {
  roomId: string;
  userId: number;
  userName: string;
  message: string;
  timestamp: string; // ISO 8601 형식의 문자열
}
