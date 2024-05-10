// src/screens/ChatRoomScreen.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp, RouteProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { getChatMessages, sendMessage } from '../api/ChatApi';
import { useUser } from '../context/UserContext';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin: 10px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const MessageContainer = styled.View`
  margin-bottom: 10px;
`;

const MessageText = styled.Text`
  padding: 10px;
  border-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const MessageInput = styled(TextInput)`
  flex: 1;
  border: 1px solid #e0e0e0;
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px 15px;
  border-radius: 5px;
`;

const SendButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

type ChatRoomScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatRoom'>;
type ChatRoomScreenRouteProp = RouteProp<RootStackParamList, 'ChatRoom'>;

interface ChatRoomScreenProps {
  navigation: ChatRoomScreenNavigationProp;
  route: ChatRoomScreenRouteProp;
}

interface ChatMessage {
  senderName: string;
  message: string;
}

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ route }) => {
  const { roomId, roomName } = route.params;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useUser();

  useEffect(() => {
    fetchChatMessages(roomId);
  }, [roomId]);

  const fetchChatMessages = async (roomId: number) => {
    const response = await getChatMessages(roomId);
    if (response.code === 0 && response.data) {
      setMessages(response.data);
    }
  };

  const handleSendMessage = async () => {
    if (user) {
      const response = await sendMessage(roomId, user.userId, newMessage);
      if (response.code === 0) {
        setNewMessage('');
        fetchChatMessages(roomId);
      }
    }
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <MessageContainer>
      <MessageText>{`${item.senderName}: ${item.message}`}</MessageText>
    </MessageContainer>
  );

  return (
    <Container>
      <Header>{roomName}</Header>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <InputContainer>
        <MessageInput
          placeholder="Type your message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <SendButton onPress={handleSendMessage}>
          <SendButtonText>Send</SendButtonText>
        </SendButton>
      </InputContainer>
    </Container>
  );
};

export default ChatRoomScreen;
