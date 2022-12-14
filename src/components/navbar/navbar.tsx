import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/avatar";
import Button from "../button/button";
import SearchBar from "../searchbar/searchbar";

export default function NavBar(props: any) {

  const sumCartItem = (cart: any) => {
    return cart.reduce((total: any, item: any) => {
      return total + item.quantity;
    }, 0)
  }

  const [value, setValue] = useState(sumCartItem(props.cart));

  useEffect(() => {
    setValue(sumCartItem(props.cart));
  }, [props.cart])

  const navigate = useNavigate()

  return (
    <div className={props.className}>
      <div className="flex col-span-4 sm:col-span-4 md:col-span-4 xl:col-span-8 2xl:col-span-8">
        <Button 
          className="mr-3 text-c-dark-brown"
          showIcon={true}
          icon="fas fa-home"
          handleClick={() => navigate('')}
        />
        <Button 
          className="mr-3 text-c-dark-brown"
          showIcon={true}
          icon="fas fa-filter"
          handleClick={props.filterHandleClick}
        />
        <SearchBar 
          className="w-4/5"
          placeholder="Tìm kiếm..."
          emitRes={(e: any) => props.emitSearchRes(e)}
        />
      </div>
      <div className="col-span-4 flex justify-end items-center">
        <Button
          className="text-c-dark-brown mr-4"
          showIcon={true}
          icon="fas fa-shopping-cart"
          badge={value}
          badgeClassName="bg-c-dark-brown"
          handleClick={props.showCartModal}
        />
        <Avatar 
          user={props.user}
          handleClick={() => navigate('user')}
        />
      </div>
    </div>
  )
}