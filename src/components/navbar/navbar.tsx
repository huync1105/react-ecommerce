import Avatar from "../avatar/avatar";
import Button from "../button/button";
import SearchBar from "../searchbar/searchbar";

export default function NavBar(props: any) {
  return (
    <div className={props.className}>
      <div className="flex col-span-8">
        <Button 
          className="mr-3 text-c-dark-brown"
          showIcon={true}
          icon="fas fa-filter"
          handleClick={props.filterHandleClick}
        />
        <SearchBar 
          className="w-4/5"
          placeholder="Tìm kiếm..."
        />
      </div>
      <div className="col-span-4 flex justify-end items-center">
        <Button
          className="text-c-dark-brown mr-4"
          showIcon={true}
          icon="fas fa-shopping-cart"
          badge={2}
          badgeClassName="bg-c-dark-brown"
        />
        <Avatar 
          user={props.user}
        />
      </div>
    </div>
  )
}