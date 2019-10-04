import React from 'react';
import { useQuery, useMutation, useApolloClient } from 'react-apollo';
import gql from 'graphql-tag';

const TRADE_COUNTS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

const TradeCount = () => {
  const client = useApolloClient();

  const { data, loading } = useQuery(QUERY_TRADECOUNT);

  const [updateTradeCount] = useMutation(UPDATE_TRADECOUNT, {
    onCompleted({ updateTradeCount }) {
      client.writeData({ data: { tradeCount: updateTradeCount } });
    }
  });

  return (
    <>
      <span>Trade Count: </span>
      {loading ? null : (
        <select
          value={data.tradeCount}
          onChange={e => {
            updateTradeCount({
              variables: { count: Number(e.target.value) }
            });
          }}
        >
          {TRADE_COUNTS.map(tc => (
            <option key={tc} value={tc}>
              {tc}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

const QUERY_TRADECOUNT = gql`
  {
    tradeCount
  }
`;

const UPDATE_TRADECOUNT = gql`
  mutation UpdateTradeCount($count: Int!) {
    updateTradeCount(count: $count)
  }
`;

export default TradeCount;
