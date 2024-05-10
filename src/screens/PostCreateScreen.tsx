// src/screens/PostCreateScreen.tsx
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';
import PostService from '../services/PostService';
import { useUser } from '../context/UserContext';
import { RootStackParamList } from '../navigation/AppNavigation';
import { StackNavigationProp } from '@react-navigation/stack';

type PostCreateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PostList'>;

interface PostCreateScreenProps {
  navigation: PostCreateScreenNavigationProp;
  route: { params: { refreshList: () => void } };
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #e0e0e0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

const SubmitButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

const PostCreateScreen: React.FC<PostCreateScreenProps> = ({ navigation, route }) => {
  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [certification, setCertification] = useState('');
  const { user } = useUser();

  const handleCreatePost = async () => {
    if (!companyName || !productName || !productCategory || !certification) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newPost = {
      userId: user.userId,
      companyName,
      productName,
      productCategory,
      certification,
    };

    try {
      await PostService.createPost(newPost);
      Alert.alert('Success', 'Post created successfully');
      route.params.refreshList();
      navigation.navigate('PostList');
    } catch (error) {
      console.error('Failed to create post', error);
      Alert.alert('Error', 'Failed to create post');
    }
  };

  return (
    <Container>
      <Label>Company Name</Label>
      <Input
        value={companyName}
        onChangeText={setCompanyName}
        placeholder="Enter company name"
      />
      <Label>Product Name</Label>
      <Input
        value={productName}
        onChangeText={setProductName}
        placeholder="Enter product name"
      />
      <Label>Product Category</Label>
      <Input
        value={productCategory}
        onChangeText={setProductCategory}
        placeholder="Enter product category"
      />
      <Label>Certification</Label>
      <Input
        value={certification}
        onChangeText={setCertification}
        placeholder="Enter certification"
      />
      <SubmitButton onPress={handleCreatePost}>
        <SubmitButtonText>Create Post</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
};

export default PostCreateScreen;
