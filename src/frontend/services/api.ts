import axios from 'axios';

const api = axios.create({
  baseURL: 'https://8e3c-149-102-233-171.ngrok-free.app/api',
});
api.defaults.headers.common["ngrok-skip-browser-warning"] = "true";


export default api;