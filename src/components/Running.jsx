import React from 'react';
import { useQuery, useMutation, useApolloClient } from 'react-apollo';
import gql from 'graphql-tag';

const Running = () => {
  const client = useApolloClient();

  const { data, loading } = useQuery(QUERY_RUNNING);

  const [updateRunning] = useMutation(UPDATE_RUNNING, {
    onCompleted({ updateRunning }) {
      client.writeData({ data: { running: updateRunning } });
    }
  });

  if (loading) {
    return null;
  }

  return (
    <button
      type='button'
      onClick={e => {
        updateRunning({
          variables: { running: !data.running }
        });
      }}
    >
      {data.running ? 'Stop' : 'Start'}
    </button>
  );
};

const QUERY_RUNNING = gql`
  {
    running
  }
`;

const UPDATE_RUNNING = gql`
  mutation UpdateRunning($running: Boolean!) {
    updateRunning(running: $running)
  }
`;

export default Running;
