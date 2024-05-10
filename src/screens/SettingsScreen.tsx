// src/screens/SettingsScreen.tsx
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ScrollContainer = styled.ScrollView`
  padding: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SettingItem = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  margin-bottom: 15px;
`;

const SettingItemText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SettingsScreen: React.FC = () => {
  return (
    <Container>
      <ScrollContainer>
        <SectionTitle>General</SectionTitle>
        <SettingItem>
          <SettingItemText>Notifications</SettingItemText>
        </SettingItem>
        <SettingItem>
          <SettingItemText>Language</SettingItemText>
        </SettingItem>

        <SectionTitle>Account</SectionTitle>
        <SettingItem>
          <SettingItemText>Change Password</SettingItemText>
        </SettingItem>
        <SettingItem>
          <SettingItemText>Privacy Settings</SettingItemText>
        </SettingItem>

        <SectionTitle>Appearance</SectionTitle>
        <SettingItem>
          <SettingItemText>Dark Mode</SettingItemText>
        </SettingItem>
        <SettingItem>
          <SettingItemText>Font Size</SettingItemText>
        </SettingItem>
      </ScrollContainer>
    </Container>
  );
};

export default SettingsScreen;
