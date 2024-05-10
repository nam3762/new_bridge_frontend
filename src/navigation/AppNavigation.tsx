// src/navigation/AppNavigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import ChatListScreen from '../screens/ChatListScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import PostListScreen from '../screens/PostListScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LogOutScreen from '../screens/LogOutScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useUser } from '../context/UserContext';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  ChatList: undefined;
  ChatRoom: { chatId: number; roomName?: string };
  PostList: undefined;
  PostCreate: undefined;
  PostDetail: { id: string };
  MyProfile: undefined;
  Settings: undefined;
  LogOut: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const ChatStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'Roboto-Bold',
        color: '#000000',
      },
    }}
  >
    <Stack.Screen
      name="ChatList"
      component={ChatListScreen}
      options={{ title: 'CoCoM' }}
    />
    <Stack.Screen
      name="ChatRoom"
      component={ChatRoomScreen}
      options={({ route }) => ({
        title: `Chat with ${route.params.roomName || route.params.chatId}`,
      })}
    />
  </Stack.Navigator>
);

const PostStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'Roboto-Bold',
        color: '#000000',
      },
    }}
  >
    <Stack.Screen
      name="PostList"
      component={PostListScreen}
      options={{ title: 'CoCoM' }}
    />
    <Stack.Screen
      name="PostCreate"
      component={PostCreateScreen}
      options={{ title: 'Create Post' }}
    />
    <Stack.Screen
      name="PostDetail"
      component={PostDetailScreen}
      options={{ title: 'Post Detail' }}
    />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconSource: any;

        if (route.name === 'Posts') {
          iconSource = require('../images/edit_icon.png');
        } else if (route.name === 'Chats') {
          iconSource = require('../images/bubble_chat.png');
        }

        return (
          <Image
            source={iconSource}
            style={{ width: size, height: size, tintColor: color }}
          />
        );
      },
      tabBarActiveTintColor: '#007aff',
      tabBarInactiveTintColor: '#8e8e8e',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Posts" component={PostStack} />
    <Tab.Screen name="Chats" component={ChatStack} />
  </Tab.Navigator>
);

const DrawerNavigator = () => {
  const { user } = useUser();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} user={user} />}
    >
      <Drawer.Screen
        name="Home"
        component={MainTabNavigator}
        options={{ title: 'CoCoM' }}
      />
      <Drawer.Screen name="MyProfile" component={MyProfileScreen} options={{ title: 'My Profile' }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Drawer.Screen name="LogOut" component={LogOutScreen} options={{ title: 'Log Out' }} />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const { user } = props;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('../images/profile_user.png')}
          style={styles.drawerHeaderImage}
        />
        <Text style={styles.drawerUsername}>{user ? user.userName : 'Guest'}</Text>
      </View>
      <DrawerItem
        label="Posts"
        onPress={() => props.navigation.navigate('Posts')}
      />
      <DrawerItem
        label="Chats"
        onPress={() => props.navigation.navigate('Chats')}
      />
      <DrawerItem
        label="My Profile"
        onPress={() => props.navigation.navigate('MyProfile')}
      />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('Settings')}
      />
      <DrawerItem
        label="Log Out"
        onPress={() => props.navigation.replace('Login')}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
  },
  drawerHeaderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  drawerUsername: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginTop: 10,
  },
});

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
