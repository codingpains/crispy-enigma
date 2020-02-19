require('dotenv').config()
import axios from 'axios';
import snakeobj from 'snakeobj';
import camelobj from 'camelobj';

const {
  API_HOST,
  API_KEY,
} = process.env;

const api = axios.create();
api.defaults.baseURL = API_HOST;
api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.headers.common.Accept = 'application/json';

// Apply middleware to send data in snake case but get it camel case
api.defaults.transformRequest = [
  ...axios.defaults.transformRequest,
  (data) => {
    if (!data) return undefined;
    if (data instanceof FormData) return data;
    return JSON.stringify(snakeobj(JSON.parse(data)));
  },
];

api.defaults.transformResponse = [
  ...axios.defaults.transformResponse,
  data => camelobj(data),
];

api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${API_KEY}`;
  return config;
});

export default {
  get: api.get,
};
