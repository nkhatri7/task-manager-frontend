export const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_BASE 
    : process.env.REACT_APP_DEV_API_BASE;