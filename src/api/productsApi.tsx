import axiosClient from './axiosClient';

export default function productsApi() {
  return {
    getProductsByCatId: (id: string) => {
      let url = `subcategories/getProductsByIdCat/${id}`;
      return axiosClient.get(url);
    }
  }
}