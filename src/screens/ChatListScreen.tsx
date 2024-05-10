// src/screens/ChatListScreen.tsx
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import ChatService from '../services/ChatService';
import { RootStackParamList } from '../navigation/AppNavigation';
import { useUser } from '../context/UserContext';
import { ChatRoom } from '../models/ChatRoom';

type ChatListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatRoom'>;

interface ChatListScreenProps {
  navigation: ChatListScreenNavigationProp;
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ChatItemContainer = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  flex-direction: row;
  align-items: center;
`;

const ChatItemTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

const ChatListScreen: React.FC<ChatListScreenProps> = ({ navigation }) => {
  const { user } = useUser();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const fetchChatRooms = async () => {
    try {
      const rooms = await ChatService.findAllRoomsByUserId(user.userId);
      setChatRooms(rooms);
    } catch (error) {
      console.error('Failed to fetch chat rooms', error);
      Alert.alert('Error', 'Failed to fetch chat rooms');
    }
  };

  const handleChatRoomPress = (roomId: string, roomName: string) => {
    navigation.navigate('ChatRoom', { chatId: roomId, roomName });
  };

  const renderChatItem = ({ item }: { item: ChatRoom }) => {
    const title = item.roomName || `Chat with ${item.participants.find((p) => p.userId !== user.userId)?.userName || 'undefined'}`;
    return (
      <ChatItemContainer onPress={() => handleChatRoomPress(item.roomId, title)}>
        <View style={{ flex: 1 }}>
          <ChatItemTitle>{title}</ChatItemTitle>
        </View>
      </ChatItemContainer>
    );
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <Container>
      <FlatList
        data={chatRooms}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.roomId}
      />
    </Container>
  );
};

export default ChatListScreen;
