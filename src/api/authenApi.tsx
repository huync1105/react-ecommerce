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
    },
    getById: (id: string) => {
      const url = `user/getUserById/${id}`;
      return axiosClient.get(url);
    },
    update: (data: any) => {
      const url = `user/update/${data._id}`;
      return axiosClient.patch(url, data);
    }
  }
}