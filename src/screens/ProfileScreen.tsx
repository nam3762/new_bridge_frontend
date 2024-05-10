// src/screens/PostDetailScreen.tsx
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Body = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Author = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Category = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
`;

const ImagePreview = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

interface PostDetailScreenProps {
  route: {
    params: {
      postId: number;
      author: string;
    };
  };
}

const postsData = [
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

const PostDetailScreen: React.FC<PostDetailScreenProps> = ({ route }) => {
  const { postId, author } = route.params;
  const post = postsData.find((p) => p.id === postId);

  return (
    <Container>
      <ImagePreview source={require('../images/no_pictures.png')} />
      <Title>{post?.title}</Title>
      <Body>{post?.body}</Body>
      <Category>{post?.category}</Category>
      <Author>By {author}</Author>
    </Container>
  );
};

export default PostDetailScreen;
