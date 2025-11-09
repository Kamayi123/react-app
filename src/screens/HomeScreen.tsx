import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchUsers, User } from '../utils/api';
import UserCard from '../components/UserCard';
import ThemedView from '../components/ThemedView';
import { useApp } from '../context/AppContext';
import { useResponsive } from '../utils/responsive';

// Home screen: fetch & display list of users with pull-to-refresh
const HomeScreen: React.FC = () => {
  const { setRefreshed, lastRefresh } = useApp();
  const { spacing } = useResponsive();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    setError(null);
    const ctrl = new AbortController();
    try {
      const data = await fetchUsers(ctrl.signal);
      setUsers(data);
      setRefreshed();
    } catch (e: any) {
      if (e.name !== 'AbortError') setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
    return () => ctrl.abort();
  }, [setRefreshed]);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load(true);
  };

  return (
    <ThemedView style={{ padding: spacing(3) }}>
      <Text style={styles.title}>Users</Text>
      {loading && !refreshing && (
        <View style={styles.center}> <ActivityIndicator /> </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={users}
        keyExtractor={(item: User) => String(item.id)}
        renderItem={({ item }: { item: User }) => <UserCard user={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={<Text style={styles.footer}>Last refresh: {new Date(lastRefresh).toLocaleTimeString()}</Text>}
        contentContainerStyle={{ paddingBottom: spacing(8) }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  center: { alignItems: 'center', marginTop: 20 },
  error: { color: '#d00', marginVertical: 8 },
  footer: { textAlign: 'center', paddingVertical: 16, color: '#666', fontSize: 12 },
});

export default HomeScreen;
