// src/screens/PostListScreen.tsx
import React, { useState } from 'react';
import styled from 'styled-components/native';
import PostList from '../components/PostList';
import { RootStackParamList } from '../navigation/AppNavigation';
import { StackNavigationProp } from '@react-navigation/stack';

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

type PostListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PostList'>;

interface PostListScreenProps {
  navigation: PostListScreenNavigationProp;
}

const PostListScreen: React.FC<PostListScreenProps> = ({ navigation }) => {
  const initialPosts = [
    {
      id: 1,
      title: 'First Post',
      body: 'This is the body of the first post',
      category: 'Travel',
      author: 'Alice',
    },
    {
      id: 2,
      title: 'Second Post',
      body: 'This is the body of the second post',
      category: 'Technology',
      author: 'Bob',
    },
    {
      id: 3,
      title: 'Third Post',
      body: 'Another technology post',
      category: 'Technology',
      author: 'Charlie',
    },
  ];
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handlePostPress = (postId: number, author: string) => {
    navigation.navigate('PostDetail', { postId, author });
  };

  return (
    <Container>
      <SearchInput
        placeholder="Search posts..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <PostList posts={filteredPosts} onPostPress={handlePostPress} />
      <AddButtonContainer>
        <AddButton onPress={() => navigation.navigate('PostCreate')}>
          <AddButtonText>+</AddButtonText>
        </AddButton>
      </AddButtonContainer>
    </Container>
  );
};

export default PostListScreen;
