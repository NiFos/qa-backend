import { gql } from "apollo-server";

export const categoriesType = gql`
  type Categories {
    categories: [Category]
  }
`;