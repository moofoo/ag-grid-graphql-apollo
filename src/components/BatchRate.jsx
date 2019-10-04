import React from 'react';
import { useQuery, useMutation, useApolloClient } from 'react-apollo';
import gql from 'graphql-tag';

const BATCH_RATES = [
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

const BatchRate = props => {
  const client = useApolloClient();

  const { data, loading } = useQuery(QUERY_BATCHRATE);

  const [updateBatchRate] = useMutation(UPDATE_BATCHRATE, {
    onCompleted({ updateBatchRate }) {
      client.writeData({ data: { batchRate: updateBatchRate } });
    }
  });

  return (
    <>
      <span>Batch Rate (ms): </span>
      {loading ? null : (
        <select
          value={data.batchRate}
          onChange={e => {
            updateBatchRate({
              variables: { rate: Number(e.target.value) }
            });
          }}
        >
          {BATCH_RATES.map(br => (
            <option key={br} value={br}>
              {br}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

const QUERY_BATCHRATE = gql`
  {
    batchRate
  }
`;

const UPDATE_BATCHRATE = gql`
  mutation UpdateBatchRate($rate: Int!) {
    updateBatchRate(rate: $rate)
  }
`;

export default BatchRate;
