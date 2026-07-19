import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import IntroScreen from './src/screens/IntroScreen';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <IntroScreen onFinish={() => setShowIntro(false)} />
        <StatusBar style="dark" />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="dark" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
