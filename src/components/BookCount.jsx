import React from 'react';
import { useQuery, useMutation, useApolloClient } from 'react-apollo';
import gql from 'graphql-tag';

const BOOK_COUNTS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

const BookCount = () => {
  const client = useApolloClient();

  const { data, loading } = useQuery(QUERY_BOOKCOUNT);

  const [updateBookCount] = useMutation(UPDATE_BOOKCOUNT, {
    onCompleted({ updateBookCount }) {
      client.writeData({ data: { bookCount: updateBookCount } });
    }
  });

  return (
    <>
      <span>Book Count: </span>
      {loading ? null : (
        <select
          value={data.bookCount}
          onChange={e => {
            updateBookCount({
              variables: { count: Number(e.target.value) }
            });
          }}
        >
          {BOOK_COUNTS.map(bc => (
            <option key={bc} value={bc}>
              {bc}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

const QUERY_BOOKCOUNT = gql`
  {
    bookCount
  }
`;

const UPDATE_BOOKCOUNT = gql`
  mutation UpdateBookCount($count: Int!) {
    updateBookCount(count: $count)
  }
`;

export default BookCount;
