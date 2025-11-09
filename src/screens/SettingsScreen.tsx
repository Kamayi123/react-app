import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import ThemedView from '../components/ThemedView';
import { useApp } from '../context/AppContext';
import { useResponsive } from '../utils/responsive';

// Settings screen: toggle app theme using Context
const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useApp();
  const { spacing } = useResponsive();
  const isDark = theme === 'dark';

  return (
    <ThemedView style={{ padding: spacing(3) }}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      <Text style={styles.hint}>Toggle to switch between light and dark themes.</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  label: { fontSize: 16 },
  hint: { fontSize: 12, color: '#666', marginTop: 8 },
});

export default SettingsScreen;
