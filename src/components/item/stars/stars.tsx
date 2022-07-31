export default function ItemStars(props: any) {

  let stars = [];
  for(let i = 0; i < 5; i++) {
    stars.push({
      color: (i+1<=props.value)?"text-amber-400":"text-neutral-400",
    })
  }
  
  return (
    <div style={{fontSize: '12px'}}>
      {
        stars.map((star: any, index: number) => {
          return (
            <i key={index} className={`fas fa-star mr-1 ${star.color}`}></i>
          )
        })
      }
    </div>
  )
}