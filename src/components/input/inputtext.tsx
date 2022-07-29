interface Props {
  isPassword?: boolean;
  inputPlaceholder?: string;
  handleChange?: any;
}

export default function Inputtext(props: Props) {
  return (
    <div className="w-full my-3">
      <input
        className="w-full border border-inherit rounded p-2"
        type={props.isPassword ? "password" : "text"}
        placeholder={props.inputPlaceholder}
        onChange={props.handleChange}
      />
    </div>
  );
}
