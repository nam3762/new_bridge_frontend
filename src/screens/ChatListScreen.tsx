// src/screens/ChatListScreen.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { getChatRooms } from '../api/ChatApi';
import { useUser } from '../context/UserContext';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.Text`
  font-size: 28px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const RoomContainer = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const RoomName = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

type ChatListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatRoom'>;

interface ChatListScreenProps {
  navigation: ChatListScreenNavigationProp;
}

interface ChatRoom {
  roomId: number;
  roomName: string;
}

const ChatListScreen: React.FC<ChatListScreenProps> = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchChatRooms(user.userId);
    }
  }, [user]);

  const fetchChatRooms = async (userId: number) => {
    const response = await getChatRooms(userId);
    if (response.code === 0 && response.data) {
      setChatRooms(response.data);
    }
  };

  const renderItem = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ChatRoom', { roomId: item.roomId, roomName: item.roomName })}>
      <RoomContainer>
        <RoomName>{item.roomName}</RoomName>
      </RoomContainer>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Header>Chats</Header>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.roomId.toString()}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default ChatListScreen;
