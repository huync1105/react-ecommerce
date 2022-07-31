import "./loading.css";
export default function Loading(props: any) {
  return (
    <div className={`w-full h-screen fixed ${props.isLoading?'flex':'hidden'} justify-center items-center bg-black/50 ${props.className}`}>
      <div className="loadingio-spinner-gear-z4zsap5e6en">
        <div className="ldio-9kqghvhow7r">
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <h1 className="text-white font-bold text-2xl">Loading...</h1>
    </div>
  )
}