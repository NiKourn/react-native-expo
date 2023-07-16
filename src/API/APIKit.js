import axios from 'axios';

export let APIKitDummy = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 10000,
});

export const setClientTokenDummy = token => {
  APIKitDummy.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default APIKitDummy;
