// src/screens/ChatRoomScreen.tsx
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigation';
import ChatService from '../services/ChatService';
import WebSocketService from '../services/WebSocketService';
import { ChatMessage } from '../models/ChatMessage';
import { useUser } from '../context/UserContext';

type ChatRoomRouteProp = RouteProp<RootStackParamList, 'ChatRoom'>;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MessageInputContainer = styled.View`
  flex-direction: row;
  padding: 10px;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  align-items: center;
`;

const MessageInput = styled.TextInput`
  flex: 1;
  border-width: 1px;
  border-color: #e0e0e0;
  border-radius: 20px;
  padding: 10px;
  margin-right: 10px;
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  border-radius: 5px;
`;

const SendButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

const ChatRoomScreen: React.FC = () => {
  const route = useRoute<ChatRoomRouteProp>();
  const { chatId, roomName } = route.params;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const webSocketService = WebSocketService;
  const { user } = useUser();

  const fetchMessages = async () => {
    try {
      const result = await ChatService.getMessages(chatId);
      setMessages(result);
    } catch (error) {
      console.error('Failed to fetch messages', error);
      Alert.alert('Error', 'Failed to fetch messages');
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const chatMessage: ChatMessage = {
      key: `${chatId}-${new Date().getTime()}`,
      roomId: chatId,
      messageId: new Date().getTime(),
      userId: user.userId,
      userName: user.userName || 'undefined',
      message: newMessage,
      timestamp: new Date(),
    };

    webSocketService.sendMessage(chatMessage);
    setMessages([...messages, chatMessage]);
    setNewMessage('');
  };

  useEffect(() => {
    fetchMessages();

    const messageSubscription = webSocketService.messages$.subscribe((message: ChatMessage) => {
      if (message.roomId === chatId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      messageSubscription.unsubscribe();
    };
  }, [chatId]);

  const renderMessageItem = ({ item }: { item: ChatMessage }) => {
    return (
      <View style={styles.messageItemContainer}>
        <Text style={styles.messageSender}>{item.userName}</Text>
        <Text>{item.message}</Text>
      </View>
    );
  };

  return (
    <Container>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => `${item.roomId}-${index}`}
      />
      <MessageInputContainer>
        <MessageInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message"
        />
        <SendButton onPress={sendMessage}>
          <SendButtonText>Send</SendButtonText>
        </SendButton>
      </MessageInputContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  messageItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  messageSender: {
    fontWeight: 'bold',
  },
});

export default ChatRoomScreen;
