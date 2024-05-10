// src/screens/PostDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Button } from 'react-native';
import styled from 'styled-components/native';
import PostService from '../services/PostService';
import ChatService from '../services/ChatService';
import { Post } from '../models/Post';
import { useUser } from '../context/UserContext';  // useUser 훅 추가
import { RootStackParamList } from '../navigation/AppNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type PostDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PostDetail'>;
type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

interface PostDetailScreenProps {
  navigation: PostDetailScreenNavigationProp;
  route: PostDetailScreenRouteProp;
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: 10px;
`;

const DetailText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 5px;
`;

const PostDetailScreen: React.FC<PostDetailScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const { user } = useUser();  // 사용자 정보 불러오기

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const result = await PostService.getPost(id);
        setPost(result);
      } catch (error) {
        console.error('Failed to fetch post detail', error);
        Alert.alert('Error', 'Failed to fetch post detail');
      }
    };

    fetchPostDetail();
  }, [id]);

  const handleChatPress = async () => {
    if (!post || !user) {
      Alert.alert('Error', 'Post data or user data is not available');
      return;
    }
    try {
      await ChatService.createChatRoom(user.userId, post.userId, post.companyName);
      navigation.navigate('ChatRoom', { userId: post.userId, roomName: post.companyName });
    } catch (error) {
      Alert.alert('Error', 'Failed to start chat with the user');
    }
  };

  if (!post) {
    return null;
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>{post.productName}</Title>
        <DetailText>Company: {post.companyName}</DetailText>
        <DetailText>Product Category: {post.productCategory}</DetailText>
        <DetailText>Certification: {post.certification}</DetailText>
        <Button title="Chatting" onPress={handleChatPress} />
      </ScrollView>
    </Container>
  );
};

export default PostDetailScreen;
