import { useNavigate } from "react-router-dom";
import Item from "../item/item";

export default function ItemsList(props: any) {
  
  let items = props.list;
  const navigate = useNavigate();
  const test = (e: any) => {
    localStorage.setItem('e_id_item', e);
    navigate(`../item/${e}`, {replace: true});
  }

  return (
    <div className={`w-full grid grid-cols-4 sm:grid-cols-4 2xl:grid-cols-12 xl:grid-cols-12 md:grid-cols-8 lg:grid-cols-8 gap-5 ${props.className}`}>
      {
        items?.map((item: any) => {
          return (
            <div 
              className="col-span-2 2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-4 sm:col-span-2"
              key={item._id}
            >
              <Item 
                _id={item._id}
                itemName={item.itemName}
                description={item.description}
                stars={item.stars}
                comments={item.comments}
                price={item.price}
                sellUpPrice={item.sellUpPrice}
                img={`${item.img}`}
                handleAdd={(e: any) => props.addToCart(e)}
                handleClick={() => test(item._id)}
                hideAddToCart={props.hideAddToCart}
              />
            </div>
          );
        })
      }
    </div>
  )
}
