import React from 'react';
import { useQuery, useMutation, useApolloClient } from 'react-apollo';
import gql from 'graphql-tag';

const BATCH_SIZES = [
  1,
  5,
  25,
  50,
  100,
  200,
  300,
  500,
  750,
  1000,
  2000,
  3000,
  4000,
  5000
];

const BatchSize = props => {
  const client = useApolloClient();

  const { data, loading } = useQuery(QUERY_BATCHSIZE);

  const [updateBatchSize] = useMutation(UPDATE_BATCHSIZE, {
    onCompleted({ updateBatchSize }) {
      client.writeData({ data: { batchSize: updateBatchSize } });
    }
  });

  return (
    <>
      <span>Batch Size: </span>
      {loading ? null : (
        <select
          value={data.batchSize}
          onChange={e => {
            updateBatchSize({
              variables: { size: Number(e.target.value) }
            });
          }}
        >
          {BATCH_SIZES.map(bs => (
            <option key={bs} value={bs}>
              {bs}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

const QUERY_BATCHSIZE = gql`
  {
    batchSize
  }
`;

const UPDATE_BATCHSIZE = gql`
  mutation UpdateBatchSize($size: Int!) {
    updateBatchSize(size: $size)
  }
`;

export default BatchSize;
