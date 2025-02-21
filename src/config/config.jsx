const config = {
    API_URL:import.meta.env.VITE_API_URL,
    API_URL_SOCKET:import.meta.env.VITE_API_URL_SOCKET,
    USER_API_URL:import.meta.env.VITE_USER_API_URL,
    ADMIN_API_URL :import.meta.env.VITE_ADMIN_API_URL,
    GOOGLE_CLIENT_ID : import.meta.env.VITE_GOOGLE_CLIENT_ID,
    APP_ID : Number(import.meta.env.VITE_APP_ID),
    SERVER_SECRET_KEY : import.meta.env.VITE_SERVER_SECRET_KEY
}

export default config;