// src/utils/WebSocketClient.ts
export type ChatRoom = {
  roomId: string;
  roomName: string;
};

export type ChatMessage = {
  key: string;
  roomId: string;
  messageId: number;
  userId: number;
  userName: string;
  message: string;
  timestamp: string;
};

export class WebSocketClient {
  private ws: WebSocket;
  private userId: number;
  private onNewRoomCallback: (newRoom: ChatRoom) => void = () => {};
  private onNewMessageCallback: (message: ChatMessage) => void = () => {};

  constructor(userId: number) {
    this.userId = userId;
    this.ws = new WebSocket('ws://172.21.116.60:8080/ws/chat');
  }

  connect() {
    this.ws.onopen = () => {
      console.log('Connected to WebSocket');
      this.ws.send(JSON.stringify({ type: 'join', userId: this.userId }));
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'new room') {
        this.onNewRoomCallback(message.room);
      } else {
        this.onNewMessageCallback(message);
      }
    };

    this.ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    this.ws.onclose = () => {
      console.log('WebSocket closed');
    };
  }

  disconnect() {
    this.ws.close();
  }

  setOnNewRoom(callback: (newRoom: ChatRoom) => void) {
    this.onNewRoomCallback = callback;
  }

  setOnNewMessage(callback: (message: ChatMessage) => void) {
    this.onNewMessageCallback = callback;
  }
}
