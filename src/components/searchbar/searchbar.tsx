import { useState } from "react";
import { toast } from "react-toastify";
import productsApi from "../../api/productsApi";
import Button from "../button/button";

export default function SearchBar(props: any) {

  let inputClassName = `px-3 focus-visible:outline-0 bg-c-light-brown ${props.inputClassName}`;
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);

  const search = (keyword: string) => {
    // console.log("keyword", keyword);
    const fetchData = async () => {
      try {
        const res = await productsApi().getItemByKey({keyword});
        setResult(res.data.items);
        props.emitRes(result);
      } catch (err) {
        toast.error(`${err}`);
      }
    }
    fetchData();
  }

  return (
    <div className={`flex justify-between items-center bg-c-light-brown overflow-hidden rounded-2xl ${props.className}`}>
      <input 
        className={`w-5/6 ${inputClassName}`}
        type="text"
        placeholder={props.placeholder}
        onChange={(e: any) => setKeyword(e.target.value)}
        onKeyUp={(e: any) => {
          if (e.key === 'Enter') {
            search(keyword);
          }
        }}
      />
      <Button 
        className="bg-c-light-brown text-c-dark-brown"
        showIcon={true}
        icon="fas fa-search"
        handleClick={() => search(keyword)}
      />
    </div>
  )
}