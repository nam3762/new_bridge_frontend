// src/screens/LogOutScreen.tsx
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const LogOutScreen: React.FC = () => {
  return (
    <Container>
      <Title>Log Out</Title>
    </Container>
  );
};

export default LogOutScreen;
