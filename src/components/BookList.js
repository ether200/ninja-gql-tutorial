import React from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = ({ data }) => {
  const { loading, books } = data;
  const [selected, setSelected] = React.useState(null);
  return (
    <div>
      <ul id="book-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          books.map((book) => (
            <li
              key={book.id}
              onClick={() => {
                setSelected(book.id);
              }}
            >
              {book.name}
            </li>
          ))
        )}
      </ul>
      {selected && <BookDetails bookId={selected} />}
    </div>
  );
};

// Bind Component
export default graphql(getBooksQuery)(BookList);
