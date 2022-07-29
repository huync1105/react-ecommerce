import axios from 'axios';
import queryString from 'query-string';

// setup default config for http request
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  //handle token here...
  const customHeaders: any = {};
  const accessToken = localStorage.getItem('token');
  console.log("accessToken", accessToken);
  if (accessToken) {
    customHeaders.Authorization = "Bearer" + " " + accessToken;
  }
  return {
    ...config,
    headers: {
      ...customHeaders,
      ...config.headers
    }
  };
})

export default axiosClient;