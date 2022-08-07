import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";

export default function SearchModal(props: any) {

  const [search, setSearch] = useState(props.value || []);
  const navigate = useNavigate();

  useEffect(() => {
    setSearch([...props.value]);
  }, [props.value])

  return (
    <div 
      className="absolute z-50 top-14 flex justify-center px-5 w-full bg-white drop-shadow-md"
      style={{
        minHeight: '200px',
        maxHeight: '500px',
        overflowY: 'scroll'
      }}
    >
      <div className="container relative">
        <Button 
          className="absolute top-0 right-0"
          showIcon={true}
          icon="fa-solid fa-circle-xmark"
          handleClick={props.handleClose}
        />
      {
        search.map((item: any) => {
          return (
            <div 
              key={item._id}
              className="flex p-3 cursor-pointer hover:bg-slate-200"
              onClick={() => {
                props.handleClose();
                navigate(`../home/item/${item._id}`)
              }}
            >
              <div 
                className="w-16 h-16 mr-3"
                style={{
                  backgroundImage: `url('${item.img}')`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              ></div>
              <div>
                <div>{item.itemName}</div>
                <div className="font-semibold">Giá: {item.price}</div>
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}
