import 'react-native-gesture-handler'; // must be first
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme as NavDark, DefaultTheme as NavLight } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { AppProvider, useApp } from './src/context/AppContext';

// Root component that wires up Context, Navigation, and StatusBar
const Tab = createBottomTabNavigator();

function RootNavigator() {
  const { theme } = useApp();
  const navTheme = theme === 'dark' ? NavDark : NavLight;

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }: { route: any }) => ({
          headerShown: true,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            const name = route.name === 'Home' ? 'home' : route.name === 'About' ? 'information-circle' : 'settings';
            return <Ionicons name={name as any} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}
