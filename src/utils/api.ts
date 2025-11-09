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

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }
  return (await res.json()) as User[];
}
