import {
  ApolloServer,
  gql,
  makeExecutableSchema,
  addMocksToSchema,
} from "apollo-server-micro";
import { graphql } from "graphql";
import { type } from "os";

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
    image: "../public/breakfast.jpg",
  },
  { id: 2, name: "lion", price: 35, image: "../public/lion.jpg" },
  { id: 3, name: "rose", price: 7.5, image: "../public/rose.jpg" },
  {
    id: 4,
    name: "strawberry",
    price: 5.0,
    image: "../public/strawberry.jpg",
  },
];

const resolvers = {
  Query: {
    items: () => items,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

addMocksToSchema({ schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({ schema, mocks: true }).createHandler({
  path: "/api/graphql",
});
