import Head from "next/head";
import Layout from "../component/layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { items, items_items } from "../apollo/types";

function usePriceState(defaultValue: number, key: string) {
  const [value, setValue] = useState<any>(() => {
    const stickyValue = 0;
    return stickyValue !== null ? Number(stickyValue) : defaultValue;
  });
  useEffect(() => {
    Number(window.localStorage.setItem(key, JSON.stringify(value)));
  }, [key, value]);
  return [value, setValue];
}

export const Index: React.FC = () => {
  const [price, setPrice] = usePriceState(0, "price");
  const [data, setData] = useState<items>([]);

  if (!data) return <div>Loading...</div>;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "post",
        url: "/api/graphql",
        data: {
          query: `query {
          items {
            id,
            name,
            price,
            image,
          }
        }`,
        },
      });
      setData(result.data.data);
    };
    fetchData();
  }, []);

  const addCount = (itemPrice: number) => {
    setPrice(itemPrice + Number(window.localStorage.getItem("price")));
  };

  return (
    <Layout>
      <Head>
        <title>shopping cart</title>
      </Head>
      <h2>
        Total ￥<a>{price}</a>
      </h2>
      {data.items?.map((item: items_items) => (
        <div key={item.id}>
          <strong>{item.name}</strong>
          <span> ￥</span>
          <small>{item.price} </small>
          <button onClick={() => addCount(item.price)}>Add Cart</button>
          <br />
          <img src={item.image} width="300" height="200" />
        </div>
      ))}
    </Layout>
  );
};

export default Index;
