import Button from "../button/button";

export default function SearchBar(props: any) {

  let inputClassName = `px-3 focus-visible:outline-0 bg-c-light-brown ${props.inputClassName}`;

  const test = () => {
    
  }

  return (
    <div className={`flex justify-between items-center bg-c-light-brown overflow-hidden rounded-2xl ${props.className}`}>
      <input 
        className={inputClassName}
        type="text"
        placeholder={props.placeholder}
      />
      <Button 
        className="bg-c-light-brown text-c-dark-brown"
        showIcon={true}
        icon="fas fa-search"
        handleClick={test}
      />
    </div>
  )
}