import { useEffect, useState } from "react";
import ItemsList from "../../components/itemslist/itemlist";
import NavBar from "../../components/navbar/navbar";
import SideBar from "../../components/sidebar/sidebar";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import mainCategoryApi from "../../api/mainCategoryApi";
import { handleHttpResponse } from "../../shared/function/globalfunction";


export default function HomeLayout(props: any) {

  let itemList = [
    {
      id: "1",
      itemName: 'Laptop Acer Gaming Nitro 5 AN515-45-R6EV (Ryzen 5 5600H/8GB RAM/512GB/15.6"FHD 144Hz/GTX1650 4GB/Win 11/Đen)',
      stars: 3,
      comments: [
        {
          content: 'laptop oke'
        },
        {
          content: 'laptop oke'
        },
      ],
      price: 23000000,
      sellUpPrice: 22000000,
      img: 'https://laptop88.vn/media/product/5938_7247_5754_6922_7688_laptop_82jw00cqvn.jpg',
    }
  ]
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState(itemList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = () => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response: any = await mainCategoryApi().getAll();
        handleHttpResponse(response, toast, () => {
          setLoading(false);
          setCategories(response.data.data);
        }, () => {
          setLoading(false);
        })
      } catch (err) {

      }
    }
    fetchData();
  }


  return (
    <div className="w-full">
      <SideBar
        className="z-20"
        listItem={categories}
      />
      <div className="navigation sticky z-10 flex justify-center w-full bg-white drop-shadow-md">
        <div className="container px-5">
          <NavBar className="w-full p-2 grid grid-cols-12 gap-5" />
        </div>
      </div>
      <div className="content w-full flex justify-center">
        <div className="container px-5">
          <ItemsList
            list={items}
          />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Loading 
      className="z-30 top-0"
      isLoading={loading} 
      />
    </div>
  );
}
