let error;
const AuthService = {
  getToken: () => {
    return localStorage.getItem('token');
  },
  getError: () => {
    return error;
  },
  register: async (name, email, password) => {
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });
    const data = await response.json();
    console.log(data);
    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } 
    error = data;
    return null;    
  },
  login: async (email, password) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://naiz-project.vercel.app/',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        username: email,
        password: password,
        expiresInMins: 60
      })
    });
    const data = await response.json();
    console.log(data);
    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } 
    error = data;
    return null;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
export default AuthService;