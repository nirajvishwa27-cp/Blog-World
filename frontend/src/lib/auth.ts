export const setToken = (token: string) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const setEmail = (email: string) => localStorage.setItem('userEmail', email);
export const getEmail = () => localStorage.getItem('userEmail');
export const isLoggedIn = () => !!localStorage.getItem('token');
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
};