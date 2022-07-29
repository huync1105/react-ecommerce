interface Props {
  className?: string; 
  btnClassName?: string;
  btnTitle?: string
  handleBtnClick?: any;
}

export default function SignBtn(props: Props) {
  let btnClassName = 'font-bold bg-slate-300 rounded p-3 w-full'
  return (
    <div className={"w-full " + props.className}>
      <button
        className={`${btnClassName} ${props.btnClassName || ''}`}
        onClick={props.handleBtnClick}
      >
        {props.btnTitle}
      </button>
    </div>
  )
}