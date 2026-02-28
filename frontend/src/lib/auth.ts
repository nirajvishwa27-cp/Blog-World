export const setToken = (token: string) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');
export const setEmail = (email: string) => localStorage.setItem('email', email);
export const getEmail = () => localStorage.getItem('email');
export const isLoggedIn = () => !!getToken();

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
};
