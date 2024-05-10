// src/context/UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface User {
  userId: number;
  userName: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleSetUser = (newUser: User) => {
    setUser(newUser);
  };

  const handleClearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, clearUser: handleClearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
