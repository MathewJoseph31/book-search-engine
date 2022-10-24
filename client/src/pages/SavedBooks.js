import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_SAVED_BOOK } from "../utils/mutations";

import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

function SavedBooks() {
  const { loading, data } = useQuery(QUERY_ME);

  const [removeSavedBook, { error }] = useMutation(REMOVE_SAVED_BOOK);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeSavedBook({
        variables: { bookId: bookId },
      });

      //console.log(data);

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  } else {
    return (
      <>
        <Jumbotron fluid className="text-light bg-dark">
          <Container>
            <h1>Viewing saved books!</h1>
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {data
              ? `Viewing ${data?.me?.savedBooks?.length} saved ${
                  data?.me?.savedBooks?.length === 1 ? "book" : "books"
                }:`
              : "You have no saved books!"}
          </h2>
          <CardColumns>
            {data?.me?.savedBooks?.map((book) => {
              return (
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Container>
      </>
    );
  }
}

export default SavedBooks;
