// Utility functions for authentication
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('token');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const logout = (): void => {
  localStorage.removeItem('token');
};