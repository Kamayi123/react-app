import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import ThemedView from '../components/ThemedView';
import { useResponsive } from '../utils/responsive';

// About screen: simple app info
const AboutScreen: React.FC = () => {
  const { spacing } = useResponsive();
  return (
    <ThemedView style={{ padding: spacing(3) }}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.body}>
        This demo app is built with React Native and Expo. It shows basic navigation, context state, responsive layout, and
        fetching data from a public API.
      </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://jsonplaceholder.typicode.com/')}>API: JSONPlaceholder</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  body: { fontSize: 14, color: '#333', lineHeight: 20 },
  link: { color: '#1565c0', marginTop: 16 },
});

export default AboutScreen;
