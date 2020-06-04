import { gql } from "apollo-boost";

export const ItemsQuery = gql`
  query items {
    items {
      id
      name
      image
      price
    }
  }
`;
