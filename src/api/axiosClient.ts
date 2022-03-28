import axios, { AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    "accept": "'application/json'"
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosClient;
