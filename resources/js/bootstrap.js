import axios from 'axios';
import './echo';

window.axios = axios;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = window.location.origin;
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
