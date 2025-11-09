// Entry point: ensure gesture-handler is imported first for React Navigation
import 'react-native-gesture-handler';
import './src/utils/devWarnings';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer, DarkTheme as NavDark, DefaultTheme as NavLight } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { AppProvider, useApp } from './src/context/AppContext';
import ErrorBoundary from './src/components/ErrorBoundary';

// RootNavigator sets up bottom tab navigation and binds theme from Context
const Tab = createBottomTabNavigator();

function RootNavigator() {
  const { theme } = useApp();
  const navTheme = theme === 'dark' ? NavDark : NavLight;

  return (
    <NavigationContainer theme={navTheme}>
      {/* Configure tab navigator with dynamic icons and theming. Remove extraneous whitespace children to avoid web text node warnings. */}
      <Tab.Navigator
        screenOptions={({ route }: { route: any }) => ({
          headerShown: Platform.OS !== 'web',
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

// App component wraps providers needed across the tree
export default function App() {
  // Preload Ionicons font to avoid fallback font warnings and layout jumps on web
  const [fontsLoaded] = useFonts({ Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf') });
  if (!fontsLoaded) {
    // Minimal splash/loading state
    return null;
  }
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <AppProvider>
          <RootNavigator />
        </AppProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
