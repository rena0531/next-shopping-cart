import useSWR from "swr";
import Head from "next/head";
import Layout from "../component/layout";

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

export default function Index() {
  const { data, error } = useSWR(
    `{items {
    id
    name
    price
    image
  }}`,
    getItems
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <Head>
        <title>shopping cart</title>
      </Head>
      {data?.items.map((item: any) => (
        <div key={item.id}>
          <strong>{item.name}</strong>
          <span> ￥</span>
          <small>{item.price}</small>
          <br />
          <img src={item.image} width="300" height="200" />
        </div>
      ))}
    </Layout>
  );
}
