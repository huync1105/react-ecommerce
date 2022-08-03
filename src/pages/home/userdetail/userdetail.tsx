import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import authenApi from "../../../api/authenApi";
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
    <div className="w-full  flex justify-center">
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
        <div className="col-span-1">
          <Avatar
            className="w-24 h-24 rounded-full overflow-hidden  border-4 border-c-dark-brown"
            user={user}
          />
        </div>
        <div className="col-span-8 grid grid-cols-2 gap-x-5">
          <div className="col-span-1 grid grid-cols-4 flex justify-between items-center">
            <span className="col-span-1">Tên</span>
            <span className="col-span-3">
              <Inputtext 
                value={user.name}
                inputPlaceholder="Nhập tên"
              />
            </span>
          </div>
          <div className="col-span-1 grid grid-cols-4 flex justify-between items-center">
            <span className="col-span-1">Email</span>
            <span className="col-span-3">
              <Inputtext 
                value={user.email}
                inputPlaceholder="Nhập email"
              />
            </span>
          </div>
          <div className="col-span-1 grid grid-cols-4 flex justify-between items-center">
            <span className="col-span-1">Giới tính</span>
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
          <div className="col-span-1 grid grid-cols-4 flex justify-between items-center">
            <span className="col-span-1">Ngày sinh</span>
            <span className="col-span-3 relative">
              <Inputtext  
                value={new Date(user.dateOfBirth).toLocaleDateString()}
                handleFocus={() => setIsShowCalendar(!isShowCalendar)}
                handleBlur={() => setIsShowCalendar(false)}
              />
              {isShowCalendar?(
                <Calendar 
                  className="w-full absolute"
                  value={new Date(user.dateOfBirth)}
                />
              ):undefined}
            </span>
          </div>
          <div></div>
        </div>
      </div>
      
    </div>
  )
}



