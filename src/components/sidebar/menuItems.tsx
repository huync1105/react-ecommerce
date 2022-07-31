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
    // {
    //   group: '', 
    //   name: 'Trợ giúp và cài đặt',
    //   child: [
    //     {
    //       _id: "TGVCD01",
    //       name: 'Tài khoản của bạn' 
    //     },
    //     {
    //       _id: "TGVCD02",
    //       name: 'Đăng xuất' 
    //     },
    //   ]
    // },
  ]
  
  const mapItems = () => {
    bigCategory.forEach((item: any) => {
      item.child = items.filter((ele: any) => ele.group === item.group);
    })
    // console.log("bigCategory", bigCategory);
  }
  mapItems();
  
  return (
    <div className={`flex ${props.className}`}>
      <div className="w-1/2 pr-3">
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
                        className="flex justify-between items-center py-2"
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
      </div>
      <div className="w-1/2 pl-3 bg-slate-600 sub-menu">
        Alo
      </div>
    </div>
  )
}