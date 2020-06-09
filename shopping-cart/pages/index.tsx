import Head from "next/head";
import Layout from "../component/layout";
import { useState, useEffect } from "react";
import { ItemLists } from "../component/ItemLists";
import axios from "axios";

const TotalCount = ({ price }: { price: number }) => {
  return (
    <h2>
      Total ￥<a>{price}</a>
    </h2>
  );
};

function usePriceState(defaultValue: number, key: string) {
  const [value, setValue] = useState<any>(() => {
    const stickyValue = 0; //window.localStorage.getItem(key);
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
    const countPrice = Number(window.localStorage.getItem("price"));
    setPrice(countPrice);
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
