// src/screens/CreateChatScreen.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { useUser } from '../context/UserContext';
import axios from 'axios';

type CreateChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateChat'>;

interface CreateChatScreenProps {
  navigation: CreateChatScreenNavigationProp;
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

interface User {
  userId: number;
  userName: string;
}

const CreateChatScreen: React.FC<CreateChatScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://172.21.116.60:8080/user/all');
        if (response.data.code === 200) {
          setUsers(response.data.data.filter((u: User) => u.userId !== user.userId));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch users');
      }
    };

    fetchUsers();
  }, [user]);

  const handleUserPress = async (guestId: number, userName: string) => {
    try {
      const response = await axios.post('http://172.21.116.60:8080/chat/create', {
        hostId: user.userId,
        guestId,
        roomName: `Chat with ${userName}`,
      });

      if (response.data.code === 200) {
        navigation.navigate('ChatRoom', { chatId: response.data.data.roomId });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create chat room');
    }
  };

  const renderUser = ({ item }: { item: User }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item.userId, item.userName)}>
      <Text style={styles.userName}>{item.userName}</Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.userId.toString()}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No users available</Text>}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userName: {
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#757575',
  },
});

export default CreateChatScreen;
