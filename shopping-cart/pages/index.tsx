import userSWR from "swr";
import { NextPage, NextApiRequest, NextApiResponse } from "next";

/*const ItemFetch = (query: any) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);*/
export const ItemFetch = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({ name: "Nextjs" }));
};

export const ItemList: NextPage = () => {
  const { data, error } = userSWR("/api/graphql", ItemFetch);
  if (error) return <>{error}</>;

  console.log(data);

  return (
    <div>ほげ</div>
    /*<>
    {data?.map(item) => (
    <div>
        <h1>{item.name}</h1>
        <img src={item.image}/>
        <p>{item.price}</p>
    </div>
          )}
          </>*/
  );
};

export default function Home() {
  return (
    <div>
      <h1>Shopping</h1>
      {/*<ItemList />*/}
    </div>
  );
}
