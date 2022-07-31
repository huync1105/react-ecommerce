import Button from "../button/button";
import MenuItems from "./menuItems";

export default function SideBar(props: any) {
  return (
    <div className={`w-80 h-screen bg-c-light-brown absolute ${props.className}`}>
      <div className="w-full flex justify-between items-center bg-c-dark-brown px-3 py-2">
        <span className="text-white text-lg">Hello Huy!</span>
        <Button 
          className="bg-white"
          showIcon={true}
          icon="fas fa-times"
        />
      </div>
      <div 
        className="px-3 h-full bg-slate-200" 
        style={{width: '200%'}}
      >
        <MenuItems 
          listItem={props.listItem}
        />
      </div>
    </div>
  )
}