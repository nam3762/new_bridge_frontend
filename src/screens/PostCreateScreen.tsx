// src/screens/PostCreateScreen.tsx
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { RootStackParamList } from '../navigation/AppNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { launchImageLibrary } from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Input = styled.TextInput`
  border: 1px solid #e0e0e0;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 15px;
  align-items: center;
  border-radius: 5px;
`;

const SubmitButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

const SelectImageButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const SelectImageIcon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: #007aff;
  margin-right: 8px;
`;

const ImagePreview = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const CheckBoxLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-left: 10px;
`;

type PostCreateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PostCreate'>;

interface PostCreateScreenProps {
  navigation: PostCreateScreenNavigationProp;
}

const PostCreateScreen: React.FC<PostCreateScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const handleImageSelect = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    if (title && body && category) {
      console.log('Post Created:', {
        title,
        body,
        category,
        imageUri,
        checkbox1,
        checkbox2,
      });
      navigation.goBack();
    }
  };

  return (
    <Container>
      <Input
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <Input
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={4}
      />
      <Input
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <SelectImageButton onPress={handleImageSelect}>
        <SelectImageIcon source={require('../images/photos.png')} />
        <SubmitButtonText>Select Image</SubmitButtonText>
      </SelectImageButton>
      {imageUri && <ImagePreview source={{ uri: imageUri }} />}
      <CheckBoxContainer>
        <CheckBox
          value={checkbox1}
          onValueChange={setCheckbox1}
          tintColors={{ true: '#007aff', false: '#e0e0e0' }}
        />
        <CheckBoxLabel>Checkbox1</CheckBoxLabel>
      </CheckBoxContainer>
      <CheckBoxContainer>
        <CheckBox
          value={checkbox2}
          onValueChange={setCheckbox2}
          tintColors={{ true: '#007aff', false: '#e0e0e0' }}
        />
        <CheckBoxLabel>Checkbox2</CheckBoxLabel>
      </CheckBoxContainer>
      <SubmitButton onPress={handleSubmit}>
        <SubmitButtonText>Submit</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
};

export default PostCreateScreen;
