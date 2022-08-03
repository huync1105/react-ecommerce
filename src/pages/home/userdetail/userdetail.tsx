import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Avatar from "../../../components/avatar/avatar";
import Button from "../../../components/button/button";
import Inputtext from "../../../components/input/inputtext";
import RadioSelect from "../../../components/input/radioselect";

export default function UserDetail(props: any) {

  // const [user, setUser]: any = useState({});
  const {user, setUser}: any = useOutletContext();
  const [isShowCalendar, setIsShowCalendar] = useState(false);

  return (
    <div className="w-full flex justify-center">
      <div  className={`container grid grid-cols-4 sm:grid-cols-4 2xl:grid-cols-12 xl:grid-cols-12 md:grid-cols-8 lg:grid-cols-8 px-5 gap-5 ${props.className}`}>
        <div className="col-span-12 flex justify-between items-center py-2">
          <span className="text-2xl font-semibold">Hồ sơ của tôi</span>
          <span>
            <Button 
              className="bg-white drop-shadow-md p-2"
              showIcon={true}
              icon="fas fa-check-circle text-xl text-cyan-600"
              label="Lưu"
            />
          </span>
        </div>
        <div className="col-span-12 sm:col-span-12 lg:col-span-1 md:col-span-12 2xl:col-span-1 flex justify-center">
          <Avatar
            className="w-24 h-24 rounded-full overflow-hidden  border-4 border-c-dark-brown"
            user={user}
          />
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-8 2xl:col-span-8 grid grid-cols-2 gap-x-5">
          <div className="2xl:col-span-1 col-span-2 grid grid-cols-4 flex justify-between items-center">
            <span className="col-span-1 font-semibold">Tên</span>
            <span className="col-span-3">
              <Inputtext 
                value={user.name}
                inputPlaceholder="Nhập tên"
              />
            </span>
          </div>
          <div className="2xl:col-span-1 col-span-2 grid grid-cols-4 flex justify-between items-center">
            <span className="col-span-1 font-semibold">Email</span>
            <span className="col-span-3">
              <Inputtext 
                value={user.email}
                inputPlaceholder="Nhập email"
              />
            </span>
          </div>
          <div className="2xl:col-span-1 col-span-2 grid grid-cols-4 flex justify-between items-center">
            <span className="col-span-1 font-semibold">Giới tính</span>
            <span className="col-span-3">
              <RadioSelect 
                items={[
                  {label: 'Nam', value: 'MALE', isSelected: false},
                  {label: 'Nữ', value: 'FEMALE', isSelected: false},
                  {label: 'Khác', value: 'OTHER', isSelected: false},
                ]}
                value={user}
                onChange={(e: any) => {
                  setUser({...user,sex:e})
                }}
              />
            </span>
          </div>
          <div className="2xl:col-span-1 col-span-2 grid grid-cols-4 flex justify-between items-center">
            <span className="col-span-1 font-semibold">Ngày sinh</span>
            <span className="col-span-3 relative">
              <Inputtext  
                value={new Date(user.dateOfBirth).toLocaleDateString()}
                handleFocus={() => setIsShowCalendar(!isShowCalendar)}
              />
              <Calendar 
                className={`w-full absolute ${isShowCalendar?"":"invisible"}`}
                value={new Date(user.dateOfBirth)}
                onChange={(e: any) => {
                  setUser({...user, dateOfBirth: e});
                  setIsShowCalendar(false);
                }}
              />
            </span>
          </div>
          <div className="col-span-2">
            <div className="flex justify-between items-center cursor-pointer py-2">
              <span className="font-semibold">Địa chỉ</span>
              <span>
                <i className="fas fa-angle-down text-xl"></i>
              </span>
            </div>
            <div className="bg-orange-100 pl-3">
                {
                  user.addresses?.map((address: any, index: any) => {
                    return (
                      <div
                        className="w-full py-2 px-3 border-b border-c-dark-brown/10"
                        key={index}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{address.label}</span>
                          <span>
                            <Button 
                              showIcon={true}
                              icon="fas fa-edit text-sky-600"
                            />
                          </span>
                        </div>
                        <div className="w-full flex py-1">
                          <span className="mr-2">
                            <i className="fas fa-map-marker-alt text-red-600"></i>
                          </span>
                          <span className="">{address.address}</span>
                        </div>
                        <div className="w-full flex py-1">
                          <span className="mr-2">
                            <i className="fas fa-phone-square text-green-700"></i>
                          </span>
                          <span className="">{address.phone}</span>
                        </div>
                      </div>
                    )
                  })
                }
                <div className="flex items-center py-1">
                  <Button 
                    className=" text-lg text-c-dark-brown/40"
                    showIcon={true}
                    icon="fas fa-plus-square"
                    label="Thêm địa chỉ mới"
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}



