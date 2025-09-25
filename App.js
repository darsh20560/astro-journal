import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SettingsProvider } from './src/context/SettingsContext';
import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0b1020',
    primary: '#a78bfa',
    card: '#0f162c',
    text: '#f5f7ff',
    border: '#1e2a4a',
    notification: '#a78bfa'
  }
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#0f162c' },
              headerTitleStyle: { color: '#f5f7ff' },
              headerTintColor: '#a78bfa',
              animation: 'slide_from_right'
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Astro Journal' }} />
            <Stack.Screen name="Journal" component={JournalScreen} options={{ title: 'Your Journal' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SettingsProvider>
    </GestureHandlerRootView>
  );
} 