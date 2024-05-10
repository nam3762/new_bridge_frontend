// src/screens/PostListScreen.tsx
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import PostService from '../services/PostService';
import { Post } from '../models/Post';
import { RootStackParamList } from '../navigation/AppNavigation';
import { StackNavigationProp } from '@react-navigation/stack';

type PostListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PostDetail'>;

interface PostListScreenProps {
  navigation: PostListScreenNavigationProp;
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const AddButtonContainer = styled.View`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

const AddButtonText = styled.Text`
  color: #ffffff;
  font-size: 30px;
  line-height: 35px;
  font-weight: bold;
`;

const SearchInput = styled.TextInput`
  margin: 15px;
  padding: 10px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #e0e0e0;
  background-color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

const PostItemContainer = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const PostTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

const PostListScreen: React.FC<PostListScreenProps> = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async () => {
    try {
      const result = await PostService.findAllPosts();
      setPosts(result);
    } catch (error) {
      console.error('Failed to fetch posts', error);
      Alert.alert('Error', 'Failed to fetch posts');
    }
  };

  const handlePostPress = (id: string) => {
    navigation.navigate('PostDetail', { id });
  };

  const handleAddButtonPress = () => {
    navigation.navigate('PostCreate', {
      refreshList: fetchPosts,
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.productCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.certification.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderPostItem = ({ item }: { item: Post }) => {
    return (
      <PostItemContainer onPress={() => handlePostPress(item.id)}>
        <PostTitle>{item.productName}</PostTitle>
      </PostItemContainer>
    );
  };

  return (
    <Container>
      <SearchInput
        placeholder="Search posts..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredPosts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
      />
      <AddButtonContainer>
        <AddButton onPress={handleAddButtonPress}>
          <AddButtonText>+</AddButtonText>
        </AddButton>
      </AddButtonContainer>
    </Container>
  );
};

export default PostListScreen;
