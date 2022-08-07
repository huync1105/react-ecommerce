import axiosClient from './axiosClient';

export default function productsApi() {
  return {
    getProductsByCatId: (id: string) => {
      let url = `subcategories/getProductsByIdCat/${id}`;
      return axiosClient.get(url);
    },
    getItemById: (id: string) => {
      let url = `products/getItemById/${id}`;
      return axiosClient.get(url);
    },
    getItemByKey: (data: any) => {
      let url = `products/getByKeyword`;
      return axiosClient.post(url, data);
    } 
  }
}