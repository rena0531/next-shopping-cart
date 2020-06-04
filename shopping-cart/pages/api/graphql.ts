import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";

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

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
