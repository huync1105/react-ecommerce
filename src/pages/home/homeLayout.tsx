import { useState } from "react";
import ItemsList from "../../components/itemslist/itemlist";
import NavBar from "../../components/navbar/navbar";


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

  const [items, setItems] = useState(itemList);

  return (
    <div className="w-full">
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
    </div>
  );
}
