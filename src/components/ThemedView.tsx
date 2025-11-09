import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

// Wrapper view that adapts background color to current theme
export const ThemedView: React.FC<{ children?: React.ReactNode; style?: any }> = ({ children, style }: { children?: React.ReactNode; style?: any }) => {
  const { theme } = useApp();
  // Filter out accidental whitespace-only string children that RN web warns about
  const filtered = React.Children.toArray(children).filter(
    (c: any) => !(typeof c === 'string' && c.trim() === '')
  );
  return <View style={[styles.base, theme === 'dark' ? styles.dark : styles.light, style]}>{filtered}</View>;
};

const styles = StyleSheet.create({
  base: { flex: 1 },
  light: { backgroundColor: '#f7f9fc' },
  dark: { backgroundColor: '#121212' },
});

export default ThemedView;
