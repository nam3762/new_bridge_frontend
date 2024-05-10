// src/screens/UserListScreen.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { getAllUsers } from '../api/user';
import { createChatRoom } from '../api/chat';
import { useUser } from '../context/UserContext';
import { User } from '../types';

type UserListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserList'>;

interface UserListScreenProps {
  navigation: UserListScreenNavigationProp;
}

const UserListScreen: React.FC<UserListScreenProps> = ({ navigation }) => {
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleUserPress = async (guestId: number, userName: string) => {
    if (!user) return;

    try {
      const response = await createChatRoom(user.userId, guestId, `Chat with ${userName}`);
      navigation.navigate('ChatRoom', { room: response.data });
    } catch (error) {
      console.error('Failed to create chat room', error);
    }
  };

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity style={styles.userContainer} onPress={() => handleUserPress(item.userId, item.userName)}>
      <Text style={styles.userName}>{item.userName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.userId.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  userContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userName: {
    fontSize: 18,
    color: '#000000',
  },
});

export default UserListScreen;
