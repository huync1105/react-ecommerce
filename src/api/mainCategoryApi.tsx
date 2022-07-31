import axiosClient from './axiosClient';

export default function mainCategoryApi() {
  return {
    getAll: () => {
      const url = 'maincategories/getList';
      return axiosClient.post(url, {});
    }
  }
}