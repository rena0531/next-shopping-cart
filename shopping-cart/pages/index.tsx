import useSWR from "swr";
import Head from "next/head";
import Layout from "../component/layout";
import { useState, useEffect } from "react";

const Counter = ({ itemPrice }: { itemPrice: number }) => {
  const initialPrice = Number(window.localStorage.getItem("price")) || 0;
  const [totalPrice, setTotalPrice] = useState<number>(initialPrice);

  useEffect(() => {
    window.localStorage.setItem("price", String(totalPrice));
  }, [totalPrice]);

  return (
    <>
      <h2>
        Total ￥<a>{totalPrice}</a>
      </h2>
      <button onClick={() => setTotalPrice(itemPrice + totalPrice)}>
        Add Cart
      </button>
    </>
  );
};

const getItems = async (query: string) =>
  await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export const Index: React.FC = () => {
  const { data, error } = useSWR(
    `{items { id, name, price, image }}`,
    getItems
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (window.localStorage.getItem("price")) {
    console.log(window.localStorage.getItem("price"));
  }

  return (
    <Layout>
      <Head>
        <title>shopping cart</title>
      </Head>

      {data.items.map((item: any) => (
        <div key={item.id}>
          <strong>{item.name}</strong>
          <span> ￥</span>
          <small>{item.price} </small>
          <Counter itemPrice={item.price} />
          <br />
          <img src={item.image} width="300" height="200" />
        </div>
      ))}
    </Layout>
  );
};

export default Index;
