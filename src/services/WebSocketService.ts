// src/services/WebSocketService.ts
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Subject } from 'rxjs';
import { ChatMessage } from '../models/ChatMessage';

class WebSocketService {
  private static instance: WebSocketService;
  private socket$: WebSocketSubject<any>;
  private messageSubject = new Subject<ChatMessage>();

  private constructor() {
    this.socket$ = webSocket('ws://172.21.116.60:8080/ws/chat');
    this.socket$.subscribe(
      (message: any) => {
        const chatMessage: ChatMessage = {
          key: message.key,
          roomId: message.roomId,
          messageId: message.messageId,
          userId: message.userId,
          userName: message.userName,
          message: message.message,
          timestamp: new Date(message.timestamp),
        };
        this.messageSubject.next(chatMessage);
      },
      (error) => console.error('WebSocket error:', error)
    );
  }

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  get messages$() {
    return this.messageSubject.asObservable();
  }

  sendMessage(chatMessage: ChatMessage) {
    this.socket$.next(chatMessage);
  }

  close() {
    this.socket$.complete();
  }
}

export default WebSocketService.getInstance();
