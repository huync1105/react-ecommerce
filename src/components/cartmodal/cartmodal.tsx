import { useState } from "react"
import { truncate } from "../../shared/function/globalfunction"
import Button from "../button/button"

export default function CartModal(props: any) {

  const [cart, setCart] = useState(props.listItem || []);
  const changeQuantity = (e: any, item: any) => {
    if (e === 'plus') {
      item.quantity += 1;
      setCart([...cart]);
    } else {
      item.quantity -= 1;
      if (item.quantity < 1) {
        let index = cart.findIndex((element: any) => element._id === item._id);
        cart.splice(index, 1);
      }
      setCart([...cart]);
    }
  }

  return (
    <div className={`w-96 h-52 overflow-y-auto bg-white drop-shadow-md rounded-md ${props.className}`}>
      <div className="w-full flex bg-c-light-brown justify-end py-1 px-2 font-semibold text-c-dark-brown cursor-pointer">Xem chi tiết</div>
      {
        cart.map((item: any) => {
          return (
            <div 
              className="w-full flex p-2 hover:bg-c-light-brown/40"
              key={item._id}
            >
              <div
                className="w-16 h-16 mr-2"
                style={{
                  backgroundImage: `url('${item.img}')`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top center'
                }}
              ></div>
              <div>
                <p className="mb-2">{truncate(item.itemName, 30)}</p>
                <div className="flex w-full">
                  <Button 
                    className="bg-white text-sm p-1 drop-shadow-md"
                    showIcon={true}
                    icon={"fas fa-minus"}
                    handleClick={() => {changeQuantity('minus', item)}}
                  />
                  <p className="mx-2">{item.quantity}</p>
                  <Button 
                    className="bg-white text-sm p-1 drop-shadow-md"
                    showIcon={true}
                    icon={"fas fa-plus"}
                    handleClick={() => {changeQuantity('plus', item)}}
                  />
                </div>
              </div>
              
            </div>
          )
        })
      }
    </div>
  )
}