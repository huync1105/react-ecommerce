import '@fortawesome/fontawesome-svg-core/styles.css'
import './button.css';

interface Button {
  className?: string;
  showIcon?: boolean;
  label?: string;
  badge?: number;
  icon?: string;
  badgeClassName?: string;
  labelClassName?: string;
  handleClick?: any;
}

export default function Button(props: Button) {

  let btnClassName = `btn-icon mx-1 ${props.showIcon?'':'hidden'} `;
  let labelClassName = `btn-label font-semibold mx-1 ${props.label?'':'hidden'}`;
  let badgeClassName = `block px-2 mx-2 font-semibold rounded-2xl bg-slate-400 text-white ${props.badge?'':'hidden'} ${props.badgeClassName}`;

  return (
    <div 
      className={`flex p-2 rounded-lg cursor-pointer ${props.className}`}
      onClick={props.handleClick}
    >
      <div className={btnClassName}>
        <i className={props.icon}></i>
      </div>
      <p className={labelClassName}>
        {props.label}
      </p>
      <span className={badgeClassName}>{props.badge}</span>
    </div>
  )
}