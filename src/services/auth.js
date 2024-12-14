let error;
const AuthService = {
  getToken: () => {
    return localStorage.getItem('token');
  },
  getError: () => {
    return error;
  },
  login: async (email, password) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        username: email,
        password: password,
        expiresInMins: 60
      })
    });
    const data = await response.json();
    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', data);
      return data;
    } 
    error = data;
    return null;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
export default AuthService;