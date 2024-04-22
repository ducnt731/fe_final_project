// src/page/GoogleAuthCallback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Parse the URL query parameters
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('accessToken');
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            navigate('/home'); // Or wherever you want to redirect after login
        } else {
            navigate('/login'); // Redirect to login on failure or absence of token
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default GoogleAuthCallback;
