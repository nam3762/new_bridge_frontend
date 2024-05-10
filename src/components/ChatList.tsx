// src/components/ChatList.tsx
import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';

const ChatListContainer = styled.ScrollView`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ChatItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const Name = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const LastMessage = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
}

interface ChatListProps {
  chats: Chat[];
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'ChatRoom'>;

const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ChatListContainer>
      {chats.map((chat, index) => (
        <ChatItem
          key={index}
          onPress={() => navigation.navigate('ChatRoom', { chatId: chat.id })}
        >
          <Avatar source={require('../images/profile_user.png')} />
          <InfoContainer>
            <Name>{chat.name}</Name>
            <LastMessage>{chat.lastMessage}</LastMessage>
          </InfoContainer>
        </ChatItem>
      ))}
    </ChatListContainer>
  );
};

export default ChatList;
