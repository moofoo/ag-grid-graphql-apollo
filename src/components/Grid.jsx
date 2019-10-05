import React, { useState } from 'react';
import { useQuery, useSubscription } from 'react-apollo';
import gql from 'graphql-tag';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { gridOptions } from './gridOptions';

function Grid() {
  const [gridApi, setGridApi] = useState(null);

  useQuery(ROWS_QUERY, {
    onCompleted: ({ rows }) => {
      if (gridApi) {
        gridApi.setRowData(rows);
      }
    }
  });

  gridOptions.onGridReady = ({ api }) => {
    if (gridApi === null) {
      setGridApi(api);
    }
  };

  useSubscription(ROWS_UPDATED, {
    fetchPolicy: 'no-cache',
    onSubscriptionData: ({
      subscriptionData: {
        data: { rowsUpdated }
      }
    }) => {
      if (gridApi) {
        gridApi.batchUpdateRowData({ update: rowsUpdated });
      }
    }
  });

  useSubscription(OPTIONS_UPDATED, {
    onSubscriptionData: ({
      subscriptionData: {
        data: { optionsUpdated }
      }
    }) => {
      if (gridApi) {
        gridApi.setRowData(optionsUpdated);
      }
    }
  });

  return (
    <div className='ag-theme-balham' style={{ width: '100%', height: '95%' }}>
      <AgGridReact gridOptions={gridOptions} />
    </div>
  );
}

const ROWS_QUERY = gql`
  {
    rows {
      id
      product
      portfolio
      book
      trade
      submitterID
      submitterDealID
      dealType
      bidFlag
      current
      previous
      pl1
      pl2
      gainDx
      sxPx
      _99Out
      batch
      updateDt
    }
  }
`;

const ROWS_UPDATED = gql`
  subscription {
    rowsUpdated {
      id
      product
      portfolio
      book
      trade
      submitterID
      submitterDealID
      dealType
      bidFlag
      current
      previous
      pl1
      pl2
      gainDx
      sxPx
      _99Out
      batch
      updateDt
    }
  }
`;

const OPTIONS_UPDATED = gql`
  subscription {
    optionsUpdated {
      id
      product
      portfolio
      book
      trade
      submitterID
      submitterDealID
      dealType
      bidFlag
      current
      previous
      pl1
      pl2
      gainDx
      sxPx
      _99Out
      batch
      updateDt
    }
  }
`;

export default React.memo(Grid);
