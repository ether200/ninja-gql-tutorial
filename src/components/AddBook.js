import React from "react";
import { graphql } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";
import { flowRight as compose } from "lodash";

const AddBook = ({ getAuthorsQuery, addBookMutation }) => {
  const { authors, loading } = getAuthorsQuery;

  const [fieldValues, setFieldValues] = React.useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const { name, genre, authorId } = fieldValues;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Send variables to the mutation
    addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
      // Refetches the data and make the booklist component refetch
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book" onSubmit={onSubmitHandler}>
      <div className="field">
        <label htmlFor="bookName">Book name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) =>
            setFieldValues({
              ...fieldValues,
              name: e.target.value,
            })
          }
        />
      </div>
      <div className="field">
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) =>
            setFieldValues({
              ...fieldValues,
              genre: e.target.value,
            })
          }
        />
      </div>
      <div className="field">
        <label htmlFor="author">Author:</label>
        <select
          onChange={(e) =>
            setFieldValues({
              ...fieldValues,
              authorId: e.target.value,
            })
          }
        >
          {loading ? (
            <option>Loading Authors...</option>
          ) : (
            <>
              <option value={""}>Select author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      <button type="submit">+</button>
    </form>
  );
};

// We use compose to add multiple querys or mutations

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
