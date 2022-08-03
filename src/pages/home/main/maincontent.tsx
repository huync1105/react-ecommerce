import { useOutletContext } from "react-router-dom";
import { DropDown } from "../../../components/input/dropdown"
import ItemsList from "../../../components/itemslist/itemlist"

export default function MainContent(props: any) {

  const { cart, setCart, item, setItem }: any = useOutletContext();

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
  }

  return (
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
  )
}