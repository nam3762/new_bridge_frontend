// App.tsx
import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { ThemeProvider } from 'styled-components/native';
import { UserProvider } from './src/context/UserContext';

const theme = {
  colors: {
    primary: '#007aff', // 파란색
    secondary: '#ff3b30', // 빨간색
    background: '#ffffff',
    textPrimary: '#000000',
    textSecondary: '#757575',
  },
  fonts: {
    bold: 'Roboto-Bold',
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
  },
};

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
