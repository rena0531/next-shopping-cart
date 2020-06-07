import useSWR from "swr";
import Head from "next/head";
import Layout from "../component/layout";
import { useState } from "react";
import { ItemLists } from "../component/ItemLists";

const TotalCount = ({ price }: { price: number }) => {
  return (
    <h2>
      Total ￥<a>{price}</a>
    </h2>
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
  const [price, setPrice] = useState<number>(0);
  const { data, error } = useSWR(
    `{items { id, name, price, image }}`,
    getItems
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const updateTotalPrice = () =>
    setPrice(Number(window.localStorage.getItem("price")));

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
