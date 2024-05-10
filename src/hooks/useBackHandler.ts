// src/hooks/useBackHandler.ts
import { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';

const useBackHandler = (message: string, onBackAction: () => void) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Logout', message, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: onBackAction,
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [message, onBackAction]);
};

export default useBackHandler;
