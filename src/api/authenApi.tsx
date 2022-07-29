import axiosClient from './axiosClient';

export default function authenApi() {
  return {
    login: (data: any) => {
      const url = 'login';
      return axiosClient.post(url, data);
    },
    register: (data: any) => {
      const url = 'register';
      return axiosClient.post(url, data);
    }
  }
}