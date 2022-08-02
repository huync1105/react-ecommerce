import { useEffect, useState } from "react";
import ItemsList from "../../components/itemslist/itemlist";
import NavBar from "../../components/navbar/navbar";
import SideBar from "../../components/sidebar/sidebar";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import mainCategoryApi from "../../api/mainCategoryApi";
import { handleHttpResponse } from "../../shared/function/globalfunction";
import "./home-layout.css";
import productsApi from "../../api/productsApi";
import authenApi from "../../api/authenApi";
import { DropDown } from "../../components/input/dropdown";
import CartModal from "../../components/cartmodal/cartmodal";


export default function HomeLayout(props: any) {

  const [categories, setCategories]:any = useState([]);
  const [item, setItem]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [user, setUser] = useState({});
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
          setItem(res.data.data[0]);
        }, () => {
          setLoading(false);
        })
      } catch (err) {}
    }
    fetchData();
  }

  const sortItems = (e: any) => {
    switch (e) {
      case "NAME":
        item.listItems.sort();
        setItem({...item});
        break;
      case "PRICE":
        item.listItems.sort((a: any, b: any) => {
          return a.price - b.price;
        });
        setItem({...item});
        break;
      case "RATE":
        item.listItems.sort((a: any, b: any) => {
          return a.stars - b.stars;
        });
        setItem({...item});
        break;
    }
  }

  const addTocart = (e: any) => {
    let index = cart.findIndex((item: any) => item._id === e._id);
    if (index === -1) {
      cart.push({...e, quantity: 1});
      setCart([...cart]);
    } 
    else {
      cart[index].quantity += 1;
      setCart([...cart]);
    }
    console.log("cart", cart);
    
  }

  return (
    <div 
      className="w-full"
    >
      <SideBar
        className={`side-bar z-20 ${openSideBar?"is-open":""}`}
        listItem={categories}
        handleClose={openSideBarAct}
        subItemClick={(e: any) => {getListProducts(e)}}
        user={user}
      />
      <div className="navigation sticky z-40 flex justify-center w-full bg-white drop-shadow-md">
        <div className="container relative px-5">
          <NavBar 
            className="w-full p-2 grid grid-cols-12 gap-5" 
            filterHandleClick={openSideBarAct}
            showCartModal={() => setOpenCartModal(!openCartModal)}
            user={user}
            cart={cart}
          />
          {
            openCartModal?(
              <CartModal 
                className="absolute right-5"
                listItem={cart}
              />
            ):undefined
          }
        </div>
      </div>
      <div className="content w-full flex justify-center">
        <div className="container px-5">
          <div className="flex justify-between items-center py-4">
            <span className="text-2xl font-semibold">{item.name}</span>
            <DropDown 
              className="z-20"
              handleSelect={(e: any)=>{sortItems(e)
              }}
            />
          </div>
          <ItemsList
            list={item.listItems}
            addToCart={(e: any) => addTocart(e)}
          />
        </div>
      </div>
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
