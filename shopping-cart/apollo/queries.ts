import gql from "graphql-tag";

export const ItemsQuery = gql`
  query items {
    items {
      id
      name
      price
      image
    }
  }
`;
