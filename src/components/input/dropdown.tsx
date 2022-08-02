import { useState } from "react";

export function DropDown(props: any) {
  
  let selections = [
    {value: 'NAME', label: 'Tên'},
    {value: 'PRICE', label: 'Giá'},
    {value: 'RATE', label: 'Đánh giá'}
  ]
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [value, setValue] = useState("");
  const getValue = (item: any) => {
    setValue(item.label);
    setIsCollapsed(!isCollapsed);
    props.handleSelect(item.value);
  }

  return (
    <div className={`relative cursor-pointer p-2 rounded-md bg-c-light-brown ${props.className}`}>
      <div 
        className="flex justify-between items-center"
        onClick={()=>{setIsCollapsed(!isCollapsed)}}
      >
        <span className="mr-2 font-semibold">Sắp xếp: {value} </span>
        <span>
          <i className="fas fa-angle-down"></i>
        </span>
      </div>
      {
        isCollapsed?(
          <div className="drop-list absolute drop-shadow-md bg-white rounded-sm w-52 top-10 right-0">
            {
              selections.map((selection: any) => {
                return (
                  <div 
                    className="p-2 border-b border-inherit hover:bg-c-light-brown/50"
                    key={selection.value}
                    onClick={() => {getValue(selection)}}
                  >{selection.label}</div>
                )
              })
            }
          </div>
        ):undefined
      }
    </div>
  );
}
