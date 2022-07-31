import Button from "../button/button";
import "./item.css";
import ItemStars from "./stars/stars";
import NumberFormat from "react-number-format";
import { truncate } from "../../shared/function/globalfunction";

interface ItemProps {
  className?: string;
  itemName: string;
  description?: string;
  stars: number;
  comments: Array<any>;
  price: number;
  sellUpPrice?: number;
  img: string;
}

export default function Item(props: ItemProps) {
  let itemImgStyle = {
    backgroundImage: `url(${props.img})`,
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const countPercent = (value1: number, value2?: number): any => {
    return Math.round(((value1 - (value2 || 0)) / value1) * 100);
  };

  return (
    <div
      className={`w-full flex flex-col relative overflow-hidden bg-white drop-shadow-md ${props.className}`}
    >
      <div
        className={`cr cr-top cr-left cr-sticky cr-red text-lg ${
          props.sellUpPrice ? "" : "hidden"
        }`}
      >
        {countPercent(props.price, props.sellUpPrice)}%
      </div>
      <Button
        className="absolute top-0 right-0 text-c-dark-brown text-2xl"
        showIcon={true}
        icon="fas fa-cart-plus"
      />
      <div
        className={`item-img w-full h-72 2xl:h-72 lg:h-52 overflow-hidden mb-4`}
        style={itemImgStyle}
      ></div>
      <div className={`item-content p-3`}>
        <p className="">
          {truncate(props.itemName, 60)}
        </p>
        <div className="item-feedback flex items-center">
          <span>
            <ItemStars value={props.stars} />
          </span>
          <span className="text-slate-400">- {props.comments.length}</span>
        </div>
        <div className={`item-price`}>
          <span
            className={`mr-2 text-md font-bold ${
              props.sellUpPrice
                ? "font-semibold text-slate-400 line-through decoration-2"
                : ""
            }`}
          >
            <NumberFormat
              value={props.price}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" VNĐ"}
            />
          </span>
          <span className="text-md font-bold">
            <NumberFormat
              value={props.sellUpPrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" VNĐ"}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
