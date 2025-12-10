const API_URL = 'http://localhost:8000';

// Auth
export const signup = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};

// Feed
export const getFeed = async (token: string) => {
  const response = await fetch(`${API_URL}/feed`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const postToFeed = async (token: string, text: string) => {
  const response = await fetch(`${API_URL}/feed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });
  return response.json();
};

// Messages
export const getInbox = async (token: string) => {
  const response = await fetch(`${API_URL}/inbox`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const sendMessage = async (
  token: string, 
  recipientUsername: string, 
  text: string, 
  isAnonymous: boolean
) => {
  const response = await fetch(`${API_URL}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      recipient_username: recipientUsername,
      text,
      is_anonymous: isAnonymous
    })
  });
  return response.json();
};

export const checkUsername = async (username: string) => {
  const response = await fetch(`${API_URL}/user/${username}`);
  return response.json();
};