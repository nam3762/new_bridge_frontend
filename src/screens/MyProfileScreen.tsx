// src/screens/MyProfileScreen.tsx
import React from 'react';
import styled from 'styled-components/native';
import { useUser } from '../context/UserContext';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: 28px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const InfoContainer = styled.View`
  margin-top: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const InfoText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MyProfileScreen: React.FC = () => {
  const { user } = useUser();
  const phone = '010-1234-5678';

  return (
    <Container>
      <Title>My Profile</Title>
      <InfoContainer>
        <Label>Name</Label>
        <InfoText>{user?.userName || 'Unknown'}</InfoText>

        <Label>Email</Label>
        <InfoText>{user?.email || 'Unknown'}</InfoText>

        <Label>Phone</Label>
        <InfoText>{phone}</InfoText>
      </InfoContainer>
    </Container>
  );
};

export default MyProfileScreen;
