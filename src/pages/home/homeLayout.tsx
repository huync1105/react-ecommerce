import { useContext, useEffect, useState } from "react";
import ItemsList from "../../components/itemslist/itemlist";
import NavBar from "../../components/navbar/navbar";
import SideBar from "../../components/sidebar/sidebar";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import mainCategoryApi from "../../api/mainCategoryApi";
import { handleHttpResponse } from "../../shared/function/globalfunction";
import "./home-layout.css";
import productsApi from "../../api/productsApi";
import { UserContext } from "../../App";


export default function HomeLayout(props: any) {

  const [categories, setCategories]:any = useState([]);
  const [item, setItem]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const {userVal, setUserVal}: any = useContext(UserContext);

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
      } catch (err) {}
    }
    fetchData().then(() => {
      getListProducts(categories[0].child[0]._id);
    });
  }

  const openSideBarAct = () => {
    setOpenSideBar(!openSideBar);
  }

  const getListProducts = (e?: any) => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await productsApi().getProductsByCatId(e);
        handleHttpResponse(res, toast, () => {
          setLoading(false);
          setItem(res.data.data[0]);
        }, () => {
          setLoading(false);
        })
      } catch (err) {}
    }
    fetchData();
  }

  return (
    <div className="w-full">
      <SideBar
        className={`side-bar z-20 ${openSideBar?"is-open":""}`}
        listItem={categories}
        handleClose={openSideBarAct}
        subItemClick={(e: any) => {getListProducts(e)}}
        user={userVal}
      />
      <div className="navigation sticky z-10 flex justify-center w-full bg-white drop-shadow-md">
        <div className="container px-5">
          <NavBar 
            className="w-full p-2 grid grid-cols-12 gap-5" 
            filterHandleClick={openSideBarAct}
            user={userVal}
          />
        </div>
      </div>
      <div className="content w-full flex justify-center">
        <div className="container px-5">
          <div className="flex justify-between items-center py-4">
            <span className="text-2xl font-semibold">{item.name}</span>
            <span>Sắp xếp: </span>
          </div>
          <ItemsList
            list={item.listItems}
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
