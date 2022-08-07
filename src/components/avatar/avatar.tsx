export default function Avatar(props: any) {
  return (
    <div 
    className={`w-9 h-9 ${props.className}`}
    onClick={props.handleClick}
    >
      <div 
        className="w-full h-full rounded-3xl overflow-hidden cursor-pointer"
        style={{
          backgroundImage: `url(${props.user.avatar?props.user.avatar:"https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
      </div>
    </div>
  )
}