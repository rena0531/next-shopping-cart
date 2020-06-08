import Head from "next/head";
import Layout from "../component/layout";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ItemLists } from "../component/ItemLists";
import axios from "axios";

const TotalCount = ({ price }: { price: number }) => {
  return (
    <h2>
      Total ￥<a>{price}</a>
    </h2>
  );
};
global.window = window;
function usePriceState(defaultValue: number, key: string) {
  const [value, setValue] = useState<any>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? Number(stickyValue) : defaultValue;
  });
  useEffect(() => {
    Number(window.localStorage.setItem(key, JSON.stringify(value)));
  }, [key, value]);
  return [value, setValue];
}

export const Index: React.FC = () => {
  const [price, setPrice] = usePriceState(0, "price");
  const [data, setData] = useState<any>([]);

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

  const updateTotalPrice = () => {
    console.log("add");
    setPrice(Number(window.localStorage.getItem("price")));
  };

  return (
    <Layout>
      <Head>
        <title>shopping cart</title>
      </Head>
      <TotalCount price={price} />
      <ItemLists data={data} updateTotalPrice={updateTotalPrice} />
    </Layout>
  );
};

export default Index;
