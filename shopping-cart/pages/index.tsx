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


export const Index: React.FC = () => {
  const initialPrice = Number(window.localStorage.getItem("price")) || 0;

  const [price, setPrice] = useState<number>(initialPrice);
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
