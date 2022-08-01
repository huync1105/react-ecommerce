export default function SubMenu(props: any) {

  let item = props.item;

  return (
    <div className={`${props.className}`}>
      <h2 className="text-xl font-semibold py-2">{item.name || ""}</h2>
      {
        item.child?.map((child: any) => {
          return (
            <div 
            key={child._id}
            className="flex items-center py-2 px-1 rounded cursor-pointer hover:bg-c-dark-brown/20"
            onClick={() => {props.handleClick(child._id)}}
          >
            <span>{child.name}</span>
          </div>
          )
        })
      }
    </div>
  )
}