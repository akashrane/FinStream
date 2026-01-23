export const getApiBaseUrl = () => {
    // If env var is set (e.g. via Vercel), use it.
    // Otherwise, fallback to localhost.
    // Note: create-react-app requires env vars to start with REACT_APP_
    const envUrl = process.env.REACT_APP_API_URL;
    if (envUrl) {
        // Ensure no trailing slash
        return envUrl.replace(/\/$/, '');
    }
    return 'http://localhost:3001';
};

export const getWsBaseUrl = () => {
    const apiBase = getApiBaseUrl();
    // Replace http/https with ws/wss
    return apiBase.replace(/^http/, 'ws');
};

export const API_BASE_URL = getApiBaseUrl();
export const WS_BASE_URL = getWsBaseUrl();
