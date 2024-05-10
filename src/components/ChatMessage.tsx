// src/components/ChatMessage.tsx
import React from 'react';
import styled from 'styled-components/native';

const MessageContainer = styled.View<{ isMine: boolean }>`
  margin: 5px 0;
  align-items: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.View<{ isMine: boolean }>`
  background-color: ${({ isMine, theme }) =>
    isMine ? theme.colors.secondary : '#e0e0e0'};
  padding: 10px;
  border-radius: 15px;
  max-width: 70%;
`;

const MessageText = styled.Text<{ isMine: boolean }>`
  color: ${({ isMine }) => (isMine ? '#ffffff' : '#000000')};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

interface ChatMessageProps {
  text: string;
  isMine: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isMine }) => (
  <MessageContainer isMine={isMine}>
    <MessageBubble isMine={isMine}>
      <MessageText isMine={isMine}>{text}</MessageText>
    </MessageBubble>
  </MessageContainer>
);

export default ChatMessage;
