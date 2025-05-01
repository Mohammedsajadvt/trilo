const API_URL = 'https://trilo-api.kiebot.com/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error: ${response.status}`);
  }
  return response.json();
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('Authentication token not found');
  }
  return {
    'x-auth-token': `${token}`,
    'Content-Type': 'application/json',
  };
};

export const login = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);
    const token = data.token || data.access_token;

    if (!token) {
      throw new Error('No authentication token received');
    }

    localStorage.setItem('auth_token', token);
    return data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw new Error(error.message || 'Failed to login');
  }
};

export const getOrganizations = async () => {
  try {
    const response = await fetch(`${API_URL}/organizations`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Fetch organizations error:', error.message);
    throw new Error(error.message || `Failed to fetch organizations`);
  }
};

export const logout = () => {
  localStorage.removeItem('auth_token');
};

export const createOrganization = async (organization) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`${API_URL}/organizations`, organization,
             {
            method:'POST',
            headers: {
                'X-auth-token': authToken || '',
            },
        });

        if (response.status !== 201) {
            const message = response.data?.message || 'Organization creation failed';
            console.error('Organization creation failed:', message);
            return message;
        }

        return response?.data;
    }
    catch (error) {
        console.error('Organization creation failed:', error);
        throw 'Organization creation failed';
    }
}