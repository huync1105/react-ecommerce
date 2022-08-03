import React, { useEffect, useState } from "react";

export default function RadioSelect(props: any) {

  const [items, setItems] = useState(props.items);

  useEffect(() => {
    mapItems();
  }, [props.items])
  
  const mapItems = () => {
    items.forEach((item: any) => {
      item.isSelected = (item.value === props.value.sex);
    })
    setItems([...items]);
  }

  return (
    <div className="w-full flex">
      {items.map((item: any) => {
        return (
          <div 
            className="flex items-center mr-3"
            key={item.value}
          >
            <span 
            className="w-5 h-5 border-2 rounded-2xl border-c-dark-brown  cursor-pointer mr-2"
            onClick={() => {
              props.onChange(item.value);
              setItems([...items]);
            }}
            >
              <div className={`w-full h-full rounded-2xl ${item.isSelected?"bg-c-dark-brown":""}`}></div>
            </span>
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
