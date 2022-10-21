import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_SAVED_BOOK = gql`
  mutation removeSavedBook($bookId: String!) {
    removeSavedBook(bookId: $bookId) {
      username
      email
      _id
      bookCount
      savedBooks {
        image
        authors
        bookId
        title
        description
      }
    }
  }
`;

export const ADD_SAVED_BOOK = gql`
  mutation addSavedBook(
    $bookId: String!
    $title: String!
    $description: String!
    $image: String!
    $authors: [String]
  ) {
    addSavedBook(
      bookId: $bookId
      title: $title
      description: $description
      image: $image
      authors: $authors
    ) {
      username
      email
      _id
      bookCount
      savedBooks {
        image
        authors
        bookId
        title
        description
      }
    }
  }
`;
