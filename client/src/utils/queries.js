import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query {
    me {
      username
      email
      _id
      bookCount
      savedBooks {
        authors
        bookId
        title
        image
        description
      }
    }
  }
`;
