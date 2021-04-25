import React from "react";
import { getBookQuery } from "../queries/queries";
import { graphql } from "react-apollo";

const BookDetails = ({ data }) => {
  const { loading, book } = data;
  return (
    <div id="book-details">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Whenever the props updates this is going to re run
export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
