// src/screens/MyProfileScreen.tsx
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ProfileHeader = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 15px;
  border-width: 3px;
  border-color: #007aff;
`;

const ProfileName = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 5px;
`;

const ProfileEmail = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProfileInfoContainer = styled.View`
  margin-bottom: 20px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const InfoLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const InfoValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MyProfileScreen: React.FC = () => {
  return (
    <Container>
      <ProfileHeader>
        <ProfileImage source={require('../images/profile_user.png')} />
        <ProfileName>John Doe</ProfileName>
        <ProfileEmail>johndoe@example.com</ProfileEmail>
      </ProfileHeader>
      <ProfileInfoContainer>
        <InfoRow>
          <InfoLabel>Username</InfoLabel>
          <InfoValue>JohnDoe123</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Email</InfoLabel>
          <InfoValue>johndoe@example.com</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Phone</InfoLabel>
          <InfoValue>+1234567890</InfoValue>
        </InfoRow>
      </ProfileInfoContainer>
    </Container>
  );
};

export default MyProfileScreen;
