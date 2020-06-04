import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    items: [Item]
  }
  type Item {
    id: Int
    name: String
    price: Int
    image: String
  }
`;

const items = [
  {
    id: 1,
    name: "Breakfast",
    price: 25.0,
    image: "/breakfast.jpg",
  },
  { id: 2, name: "lion", price: 35, image: "/lion.jpg" },
  { id: 3, name: "rose", price: 30, image: "/rose.jpg" },
  {
    id: 4,
    name: "strawberry",
    price: 5.0,
    image: "/strawberry.jpg",
  },
];

const resolvers = {
  Query: {
    items: () => items,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
