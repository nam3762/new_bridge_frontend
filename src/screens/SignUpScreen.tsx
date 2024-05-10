// src/screens/SignUpScreen.tsx
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { signUp } from '../api/UserApi';

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

const SuccessMessage = styled.Text`
  color: green;
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

const SignInText = styled.Text`
  text-align: center;
  margin-top: 15px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    const response = await signUp(email, password, username);
    if (response.code === 0) {
      setSuccessMessage('Sign up success');
      setTimeout(() => navigation.replace('Login'), 1000);
    } else {
      setErrorMessage(response.message || 'Unknown Error');
    }
  };

  return (
    <Container>
      <Title>Sign Up</Title>
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      {successMessage ? <SuccessMessage>{successMessage}</SuccessMessage> : null}
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
      <Button onPress={handleSignUp}>
        <ButtonText>Sign Up</ButtonText>
      </Button>
      <SignInText onPress={() => navigation.navigate('Login')}>
        Already have an account? Sign in
      </SignInText>
    </Container>
  );
};

export default SignUpScreen;
