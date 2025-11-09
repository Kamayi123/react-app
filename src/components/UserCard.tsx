import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../utils/api';

// Card to display user details from API
export const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.meta}>{user.email}</Text>
      <Text style={styles.meta}>{user.phone}</Text>
      {user.company?.name && <Text style={styles.company}>{user.company.name}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  meta: { fontSize: 13, color: '#555' },
  company: { fontSize: 12, marginTop: 4, fontStyle: 'italic', color: '#333' },
});

export default UserCard;
