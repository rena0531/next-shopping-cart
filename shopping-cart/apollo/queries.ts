import gql from "graphql-tag";

export const ItemsQuery = gql`
  query items {
    id
    name
    price
    image
  }
`;
