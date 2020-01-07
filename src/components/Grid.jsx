import React, { useContext } from 'react';
import { useQuery, useSubscription } from 'react-apollo';
import gql from 'graphql-tag';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { gridOptions } from './gridOptions';
import { Context } from '../context';

function Grid() {
  const {
    state: { gridApi },
    setGridApi
  } = useContext(Context);

  gridOptions.onGridReady = ({ api }) => {
    if (gridApi === null) {
      setGridApi(api);
    }
  };

  useQuery(ROWS_QUERY, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ rows }) => {
      if (gridApi) {
        gridApi.setRowData(rows);
        setGridApi(gridApi);
      }
    }
  });

  useSubscription(ROWS_UPDATED, {
    fetchPolicy: 'no-cache',
    onSubscriptionData: ({
      subscriptionData: {
        data: { rowsUpdated }
      }
    }) => {
      if (gridApi) {
        gridApi.batchUpdateRowData({ update: rowsUpdated });
        setGridApi(gridApi);
      }
    }
  });

  useSubscription(OPTIONS_UPDATED, {
    fetchPolicy: 'no-cache',
    onSubscriptionData: ({
      subscriptionData: {
        data: { optionsUpdated }
      }
    }) => {
      if (gridApi) {
        gridApi.setRowData(optionsUpdated);
        setGridApi(gridApi);
      }
    }
  });

  return (
    <div className='ag-theme-balham' style={{ height: '95%' }}>
      <AgGridReact gridOptions={gridOptions} />
    </div>
  );
}

const ROW_FIELDS = gql`
  fragment RowFields on Row {
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
    average
  }
`;

const ROWS_QUERY = gql`
  {
    rows {
      ...RowFields
    }
  }
  ${ROW_FIELDS}
`;

const ROWS_UPDATED = gql`
  subscription {
    rowsUpdated {
      ...RowFields
    }
  }
  ${ROW_FIELDS}
`;

const OPTIONS_UPDATED = gql`
  subscription {
    optionsUpdated {
      ...RowFields
    }
  }
  ${ROW_FIELDS}
`;

export default React.memo(Grid);
