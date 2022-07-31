import Item from "../item/item";

export default function ItemsList(props: any) {
  let items = props.list;

  return (
    <div className={`w-full grid sm:grid-cols-4 2xl:grid-cols-12 xl:grid-cols-12 md:grid-cols-8 lg:grid-cols-8 ${props.className}`}>
      {
        items.map((item: any) => {
          return (
            <div 
              className="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-2 sm:col-span-2"
              key={item.id}
            >
              <Item 
                itemName={item.itemName}
                description={item.description}
                stars={item.stars}
                comments={item.comments}
                price={item.price}
                sellUpPrice={item.sellUpPrice}
                img={`${item.img}`}
              />
            </div>
          );
        })
      }
    </div>
  )
}
