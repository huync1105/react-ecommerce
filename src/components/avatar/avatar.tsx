export default function Avatar(props: any) {
  return (
    <div className={`w-9 h-9 ${props.className}`}>
      <div 
        className="w-full h-full rounded-3xl overflow-hidden border-2 border-c-dark-brown cursor-pointer"
        style={{
          backgroundImage: `url(${props.user.avatar?"https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png":"https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
      </div>
    </div>
  )
}