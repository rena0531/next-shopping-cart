import { SetStateAction, useState, useEffect } from "react";

const Counter = ({
  itemPrice,
  onTotalPriceUpdate,
}: {
  itemPrice: number;
  onTotalPriceUpdate: (value: SetStateAction<number>) => void;
}) => {
  const initialPrice = Number(window.localStorage.getItem("price")) || 0;
  const [totalPrice, setTotalPrice] = useState<number>(initialPrice);
  const addCount = () => {
    onTotalPriceUpdate(itemPrice + totalPrice);
    setTotalPrice(itemPrice + totalPrice);
  };

  useEffect(() => {
    window.localStorage.setItem("price", String(totalPrice));
  }, [totalPrice]);

  return (
    <>
      <button onClick={() => addCount()}>Add Cart</button>
    </>
  );
};

export const ItemLists = ({
  data,
  updateTotalPrice,
}: {
  data: any;
  updateTotalPrice: () => void;
}) => {
  return (
    <>
      {data.items?.map((item: any) => (
        <div key={item.id}>
          <strong>{item.name}</strong>
          <span> ￥</span>
          <small>{item.price} </small>
          <Counter
            itemPrice={item.price}
            onTotalPriceUpdate={updateTotalPrice}
          />
          <br />
          <img src={item.image} width="300" height="200" />
        </div>
      ))}
    </>
  );
};
