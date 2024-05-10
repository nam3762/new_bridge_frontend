// src/components/PostItem.tsx
import React from 'react';
import styled from 'styled-components/native';

const PostItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 15px;
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Body = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Category = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.primary};
`;

interface PostItemProps {
  title: string;
  body: string;
  category: string;
  onPress: () => void;
}

const PostItem: React.FC<PostItemProps> = ({
  title,
  body,
  category,
  onPress,
}) => {
  return (
    <PostItemContainer onPress={onPress}>
      <PostImage source={require('../images/no_pictures.png')} />
      <InfoContainer>
        <Title>{title}</Title>
        <Body numberOfLines={2}>{body}</Body>
        <Category>{category}</Category>
      </InfoContainer>
    </PostItemContainer>
  );
};

export default PostItem;
