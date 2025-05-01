const API_URL = 'https://trilo-api.kiebot.com/api';

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        console.log('Response data:', data);

        const token = data.token || data.access_token;
        if (token) {
            localStorage.setItem('auth_token', token);
            console.log('Token saved:', token);
        } else {
            console.log('No token found in response');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
};