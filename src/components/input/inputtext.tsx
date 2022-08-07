interface Props {
  isPassword?: boolean;
  inputPlaceholder?: string;
  handleChange?: any;
  value?: any;
  handleFocus?: any;
  handleBlur?: any;
  handleOnKeyUp?: any;
}

export default function Inputtext(props: Props) {
  return (
    <div className="w-full my-3">
      <input
        value={props.value}
        className="w-full border border-inherit rounded p-2"
        type={props.isPassword ? "password" : "text"}
        placeholder={props.inputPlaceholder}
        onChange={props.handleChange}
        onFocus={props.handleFocus}
        onBlur={props.handleBlur}
        onKeyUp={(e: any) => props.handleOnKeyUp(e)}
      />
    </div>
  );
}
