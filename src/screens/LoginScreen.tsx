// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { signIn, getUserById } from '../api/UserApi';
import { useUser } from '../context/UserContext';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: 28px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ErrorMessage = styled.Text`
  color: red;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #e0e0e0;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 15px;
  align-items: center;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

const SignUpText = styled.Text`
  text-align: center;
  margin-top: 15px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Logo = styled.Image`
  width: 200px;
  height: 83px;
  align-self: center;
  justify-content: center;
`;

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useUser();

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const response = await signIn(email, password);

      if (response.code === 200 && response.data) {
        const userId = response.data.userId;
        const userResponse = await getUserById(userId);

        if (userResponse.code === 200 && userResponse.data) {
          setUser({
            userId: userResponse.data.userId,
            userName: userResponse.data.userName,
            email: userResponse.data.email,
          });

          // 화면을 Home으로 전환
          navigation.replace('Home');
        } else {
          setErrorMessage('Unknown Error');
        }
      } else if (response.code === -1) {
        setErrorMessage('Unknown Error');
      } else {
        setErrorMessage(response.message || 'Unauthorized Error');
      }
    } catch (error) {
      setErrorMessage('Network Error');
    }
  };

  return (
    <Container>
      <Logo source={require('../images/bridge.png')} />
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleLogin}>
        <ButtonText>Login</ButtonText>
      </Button>
      <SignUpText onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign up
      </SignUpText>
    </Container>
  );
};

export default LoginScreen;
