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
    const res = await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      }
    });
    const token = await res.json();
    console.log(token)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        csrf: token,
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
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
export default AuthService;