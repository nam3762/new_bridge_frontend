// src/screens/CreateChatScreen.tsx
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import ChatService from '../services/ChatService';
import { useUser } from '../context/UserContext';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

interface User {
  userId: number;
  userName: string;
}

const CreateChatScreen: React.FC = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://172.21.116.60:8080/user/all');
        if (response.status === 200 && response.data.code === 200) {
          setUsers(response.data.data.filter((u: User) => u.userId !== user.userId));
        } else {
          throw new Error(`Unexpected response code: ${response.data.code}`);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch users');
        console.error('Fetch users error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleCreateChatRoom = async (guestId: number, userName: string) => {
    try {
      const result = await ChatService.createChatRoom(user.userId, guestId, `${user.userName} and ${userName}`);
      navigation.navigate('ChatRoom', { chatId: result.data.roomId, roomName: result.data.roomName });
    } catch (error) {
      Alert.alert('Error', 'Failed to create chat room');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Container>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem} onPress={() => handleCreateChatRoom(item.userId, item.userName)}>
            <Text style={styles.userName}>{item.userName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.userId.toString()}
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
});

export default CreateChatScreen;