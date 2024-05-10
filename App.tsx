// App.tsx
import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { ThemeProvider } from 'styled-components/native';
import { UserProvider } from './src/context/UserContext';
import { Text, View, StyleSheet } from 'react-native';

const theme = {
  colors: {
    primary: '#41B06E', // 파란색
    secondary: '#8DECB4', // 빨간색
    background: '#ffffff',
    textPrimary: '#000000',
    textSecondary: '#757575',
  },
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Picashow', // 폰트 이름으로 지정
    fontSize: 24,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AppNavigation />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
