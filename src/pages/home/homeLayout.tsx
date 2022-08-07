import { useEffect, useState } from "react";
import NavBar from "../../components/navbar/navbar";
import SideBar from "../../components/sidebar/sidebar";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import mainCategoryApi from "../../api/mainCategoryApi";
import { handleHttpResponse } from "../../shared/function/globalfunction";
import "./home-layout.css";
import productsApi from "../../api/productsApi";
import authenApi from "../../api/authenApi";
import CartModal from "../../components/cartmodal/cartmodal";
import { Outlet } from "react-router-dom";
import SearchModal from "../../components/searchmodal/searchmodal";


export default function HomeLayout(props: any) {

  const [categories, setCategories]:any = useState([]);
  const [item, setItem]: any = useState({});
  const [search, setSearch]: any = useState([]);
  const [showSearchModal, setShowSearchModal]: any = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [user, setUser]: any = useState({});
  const [cart, setCart]: any = useState([]);

  useEffect(() => {
    getCategories();
    getCurrentUser();
  }, []);
  
  const getCurrentUser = () => {
    let userId = localStorage.getItem("e_id_client");
    const fetchData = async () => {
      try {
        const res = await authenApi().getById(userId || "");
        setUser(res.data.userInfo);
      } catch (err) {

      }
    }
    fetchData();
  }

  const getCategories = () => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response: any = await mainCategoryApi().getAll();
        handleHttpResponse(response, toast, () => {
          setLoading(false);
          setCategories(response.data.data);
          getListProducts(response.data.data[0]?.child[0]._id);
        }, () => {
          setLoading(false);
        })
      } catch (err) {}
    }
    fetchData();
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
          setItem(res.data.data);
        }, () => {
          setLoading(false);
        })
      } catch (err) {}
    }
    fetchData();
  }

  return (
    <div 
      className="w-full"
    >
      <div 
        className={`w-full h-full fixed z-50 bg-black/40 ${openSideBar?"":"hidden"}`}
        onClick={() => setOpenSideBar(false)}
      ></div>
      <SideBar
        className={`side-bar z-50 ${openSideBar?"is-open":""}`}
        listItem={categories}
        handleClose={openSideBarAct}
        subItemClick={(e: any) => {getListProducts(e)}}
        user={user}
      />
      {showSearchModal?(
        <SearchModal
          value={search}
          handleClose={() => setShowSearchModal(false)}
        />
      ):undefined}
      <div className="navigation sticky z-40 flex justify-center w-full bg-white drop-shadow-md">
        <div className="container relative px-5">
          <NavBar 
            className="w-full p-2 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 xl:grid-cols-12 2xl:grid-cols-12 gap-5" 
            filterHandleClick={openSideBarAct}
            showCartModal={() => setOpenCartModal(!openCartModal)}
            emitSearchRes={(e: any) => {
              setSearch(e);
              setShowSearchModal(true)
            }}
            user={user}
            cart={cart}
          />
          {
            openCartModal?(
              <CartModal 
                className="absolute right-5"
                listItem={cart}
                handleOnChange={(e: any) => {setCart(e)}}
              />
            ):undefined
          }
        </div>
      </div>
      <Outlet context={{ cart, setCart, item, setItem, user, setUser, setLoading }} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Loading 
        className="z-50 top-0"
        isLoading={loading} 
      />
    </div>
  );
}
