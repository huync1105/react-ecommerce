import { useEffect, useState } from "react"
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import productsApi from "../../../api/productsApi";
import Feedback from "../../../components/feedback/feedback";
import ItemStars from "../../../components/item/stars/stars";
import ItemsList from "../../../components/itemslist/itemlist";

export default function ItemDetail() {

  let { id }: any = useParams()
  const  [suggestedItems, setSuggestedItems]: any = useState([]);
  const [item, setItem]: any = useState({});

  useEffect(() => {
    getItem(id);
  }, [id])

  useEffect(() => {
    console.log("item", item);
    
  }, [item])
  

  const getItem = (id: string) => {
    const fetchData = async () => {
      try {
        const res: any = await productsApi().getItemById(id);
        // console.log("Res", res);
        setItem(res.data.item);
        getSuggestedItem(res.data.item)
      } catch(err) {
        toast.error(`${err}`);
      }
    }
    fetchData();
    
  }

  const getSuggestedItem = (item: any) => {
    const fetchData = async () => {
      try {
        const res: any = await productsApi().getProductsByCatId(item.idCategory);
        // console.log("res cat", res);
        setSuggestedItems(res.data.data.listItems);
        // console.log("suggestedItems", suggestedItems);
      } catch (err) {
        toast.error(`${err}`);
      }
    }
    fetchData();
  }

  return (
    <div className="content w-full flex justify-center">
      <div className="container px-5 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 2xl:grid-cols-12 py-8 gap-0 2xl:gap-5">
        <div 
          className="item-img col-span-4 h-96"
          style={{
            backgroundImage: `url('${item.img}')`,
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: "cover",
          }}
        ></div>
        <div className="item-info col-span-4 2xl:col-span-8">
          <span className="w-full text-xl">
            <h2>{item.itemName}</h2>
          </span>
          <div className="w-full my-2 flex items-center">
            <ItemStars value={item.stars}/>
            <span> - {item.comments?.length} đánh giá</span>
          </div>
          <div>
            <span
              className={`mr-2 text-md font-bold ${
                item.sellUpPrice
                  ? "font-semibold text-slate-400 line-through decoration-2"
                  : ""
              }`}
            >
              <NumberFormat
                value={item.price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VNĐ"}
              />
            </span>
            <span className="text-md font-bold">
              <NumberFormat
                value={item.sellUpPrice}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VNĐ"}
              />
            </span>
          </div>
        </div>
        <div className="w-full col-span-4 md:col-span-8 xl:col-span-12 2xl:col-span-12 border-b-2 border-c-dark-brown/20 py-3"></div>
        <div className="suggested-list col-span-12">
          <h2 className="text-2xl font-semibold mb-4">Sản phẩm tương tự</h2>
          <ItemsList 
            list={suggestedItems}
            hideAddToCart={true}
          />
        </div>
        <div className="w-full col-span-12 border-b-2 border-c-dark-brown/20 py-3"></div>
        <div className="col-span-12">
          <h2 className="text-2xl font-semibold mb-4">Đánh giá của khách hàng</h2>
          {
            item.comments?(<Feedback 
            value={item.comments}
          />):undefined
          }
          
        </div>
      </div>
    </div>
  )
}
