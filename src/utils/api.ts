// Simple API client utilities
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company?: { name: string };
}

export interface UserFetchResult {
  users: User[];
  offline: boolean; // true when fallback/mock data used
  error?: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'Offline User One', username: 'offline1', email: 'offline1@example.com', phone: '000-000', website: 'offline.local' },
  { id: 2, name: 'Offline User Two', username: 'offline2', email: 'offline2@example.com', phone: '000-000', website: 'offline.local' }
];

export async function fetchUsers(signal?: AbortSignal): Promise<UserFetchResult> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal });
    if (!res.ok) {
      return { users: mockUsers, offline: true, error: `Status ${res.status}` };
    }
    const data = (await res.json()) as User[];
    return { users: data, offline: false };
  } catch (e: any) {
    // Handle DNS / network resolution errors (ERR_NAME_NOT_RESOLVED) and other fetch failures
    return { users: mockUsers, offline: true, error: e?.message || 'Network error' };
  }
}
