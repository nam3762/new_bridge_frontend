// src/components/ChatInput.tsx
import React, { useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  padding: 10px;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
  border-radius: 25px;
  border-width: 1px;
  border-color: #e0e0e0;
  margin-right: 10px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

const SendButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

const SendButtonImage = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: #ffffff;
`;

const ChatInput: React.FC<{ onSend: (text: string) => void }> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <Container>
      <Input
        placeholder="Type message"
        value={text}
        onChangeText={setText}
      />
      <SendButton onPress={handleSend}>
        <SendButtonImage source={require('../images/enter.png')} />
      </SendButton>
    </Container>
  );
};

export default ChatInput;
