import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import "./menu-item.css"
import SubMenu from "./submenu";

export default function MenuItems(props: any) {

  let items = props.listItem;
  let bigCategory = [
    {
      group: 'TBCN', 
      name: 'Thiết bị công nghệ',
      child: []
    },
    {
      group: 'TT', 
      name: 'Thời trang',
      child: []
    },
    {
      group: 'TH', 
      name: 'Tạp hóa',
      child: []
    },
  ]
  const [isInChild, setIsInChild] = useState(false);
  const [subItem, setSubItem] = useState({});
  const navigate = useNavigate();

  const mapItems = () => {
    bigCategory.forEach((item: any) => {
      item.child = items.filter((ele: any) => ele.group === item.group);
    })
    // console.log("bigCategory", bigCategory);
  }
  mapItems();

  const changeTab = (e?: any) => {
    setIsInChild(!isInChild);
    if (e) setSubItem(e);
  }

  
  return (
    <div className={`flex ${isInChild?"child-tab":""} ${props.className}`}>
      <div className="w-1/2 pr-3 overflow-x-auto">
        {
          bigCategory.map((category: any) => {
            return (
              <div key={category.group} className="my-2">
                <h2 className="text-xl font-semibold py-2">{category.name}</h2>
                {
                  category.child.map((child: any) => {
                    return (
                      <div 
                        key={child._id}
                        className="flex justify-between items-center py-2 px-1 rounded cursor-pointer hover:bg-c-dark-brown/20"
                        onClick={() => {changeTab(child)}}
                      >
                        <span>{child.name}</span>
                        <i className="fas fa-angle-right"></i>
                      </div>
                    )
                  })
                }
                <div className="border border-c-dark-brown/20"></div>
              </div>
            )
          })
        }
        <div className="my-2">
          <h2 className="text-xl font-semibold py-2">Trợ giúp & Cài đặt</h2>
          <div 
            className="flex justify-between items-center py-2 px-1 rounded cursor-pointer hover:bg-c-dark-brown/20"
            onClick={() => navigate('user')}
          >
            <span>Tài khoản của bạn</span>
            <i className="fas fa-angle-right"></i>
          </div>
          <div 
            className="flex justify-between items-center py-2 px-1 rounded cursor-pointer hover:bg-c-dark-brown/20"
            onClick={() => {
              navigate('/');
              localStorage.clear();
            }}
          >
            <span>Đăng xuất</span>
            <i className="fas fa-angle-right"></i>
          </div>
        </div>
      </div>
      <div className="w-1/2 relative pl-3 bg-c-light-brown sub-menu">
        <div 
          className="w-full left-0 flex justify-between items-center py-2 pr-3 cursor-pointer"
          style={{marginLeft: "-0.75rem"}}
          onClick={changeTab}
        >
          <Button 
            className=""
            showIcon={true}
            icon="fas fa-arrow-left"
            label="Quay lại"
          />
        </div>
        <div 
          className="w-full border border-c-dark-brown/20"
          style={{marginLeft: "-0.75rem"}}
        ></div>
        <div className="sub-menu pr-3">
          <SubMenu 
            item={subItem}
            handleClick={(e: any) => {props.subItemClick(e)}}
          />
        </div>
      </div>
    </div>
  )
}