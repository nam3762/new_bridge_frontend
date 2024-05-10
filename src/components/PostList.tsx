// src/components/PostList.tsx
import React from 'react';
import styled from 'styled-components/native';
import PostItem from './PostItem';

const PostListContainer = styled.ScrollView`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const CheckboxLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: 5px;
`;

interface Post {
  id: number;
  title: string;
  body: string;
  category: string;
  image?: string;
  author: string;
  checkbox1?: boolean;
  checkbox2?: boolean;
}

interface PostListProps {
  posts: Post[];
  onPostPress: (postId: number, author: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostPress }) => {
  return (
    <PostListContainer>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <PostItem
            title={post.title}
            body={post.body}
            category={post.category}
            image={post.image}
            onPress={() => onPostPress(post.id, post.author)}
          />
          {post.checkbox1 && <CheckboxLabel>Checkbox1</CheckboxLabel>}
          {post.checkbox2 && <CheckboxLabel>Checkbox2</CheckboxLabel>}
        </React.Fragment>
      ))}
    </PostListContainer>
  );
};

export default PostList;
