export default function Avatar(props: any) {
  return (
    <div className={props.className}>
      <div className="rounded-3xl overflow-hidden border-2 border-c-dark-brown cursor-pointer">
        <img src={props.userImg?"https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png":"https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png"} alt="" width="38" />
      </div>
    </div>
  )
}