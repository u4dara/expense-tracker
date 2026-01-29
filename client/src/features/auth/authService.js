import axios from 'axios';

const SIGNUP_API_URL = 'http://localhost:5500/api/v1/auth/sign-up';
const SIGNIN_API_URL = 'http://localhost:5500/api/v1/auth/sign-in';

// Sign up new user
const signUp = async (userData) => {
  const response = await axios.post(SIGNUP_API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }

  return response.data.data;
};

// Sign in existing user
const signIn = async (userData) => {
  const response = await axios.post(SIGNIN_API_URL, userData);

  if (response.data)
    localStorage.setItem('user', JSON.stringify(response.data.data));

  return response.data.data;
};

// Sign out user
const signOut = () => {
  localStorage.removeItem('user');
};

const authService = {
  signUp,
  signIn,
  signOut,
};

export default authService;
