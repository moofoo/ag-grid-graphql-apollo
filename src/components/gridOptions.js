const columnDefs = [
  // these are the row groups, so they are all hidden (they are showd in the group column)
  {
    headerName: 'Hierarchy',
    children: [
      {
        headerName: 'Product',
        field: 'product',
        type: 'dimension',
        rowGroupIndex: 0,
        hide: true
      },
      {
        headerName: 'Portfolio',
        field: 'portfolio',
        type: 'dimension',
        rowGroupIndex: 1,
        hide: true
      },
      {
        headerName: 'Book',
        field: 'book',
        type: 'dimension',
        rowGroupIndex: 2,
        hide: true
      }
    ]
  },

  // some string values, that do not get aggregated
  {
    headerName: 'Attributes',
    children: [
      { headerName: 'Trade', field: 'trade', width: 100, hide: true },
      {
        headerName: 'Deal Type',
        field: 'dealType',
        type: 'dimension',
        width: 90
      },
      { headerName: 'Bid', field: 'bidFlag', type: 'dimension', width: 65 }
    ]
  },

  // all the other columns (visible and not grouped)
  {
    headerName: 'Values',
    children: [
      { headerName: 'Current', field: 'current', type: 'measure', width: 100 },
      {
        headerName: 'Previous',
        field: 'previous',
        type: 'measure',
        width: 100
      },
      { headerName: 'PL 1', field: 'pl1', type: 'measure', width: 75 },
      { headerName: 'PL 2', field: 'pl2', type: 'measure', width: 75 },
      { headerName: 'Gain-DX', field: 'gainDx', type: 'measure', width: 80 },
      { headerName: 'SX / PX', field: 'sxPx', type: 'measure', width: 75 },
      { headerName: '99 Out', field: '_99Out', type: 'measure', width: 75 },
      {
        headerName: 'Submitter ID',
        field: 'submitterID',
        type: 'measure',
        hide: true
      },
      {
        headerName: 'Submitted Deal ID',
        field: 'submitterDealID',
        type: 'measure',
        hide: true
      },
      {
        headerName: 'id',
        field: 'id',
        hide: true
      },
      {
        headerName: 'updateDt',
        field: 'updateDt',
        hide: true
      },
      {
        headerName: 'average',
        field: 'average',
        hide: true
      }
    ]
  }
];

function numberCellFormatter(params) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const gridOptions = {
  cacheQuickFilter: true,
  columnTypes: {
    dimension: {
      enableRowGroup: true,
      enablePivot: true
    },
    measure: {
      width: 150,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer'
    }
  },

  columnDefs: columnDefs,
  enableStatusBar: true,
  enableColResize: true,
  enableRangeSelection: true,
  enableSorting: true,
  rowGroupPanelShow: true,
  pivotPanelShow: true,
  suppressAggFuncInHeader: true,
  getRowNodeId: function(data) {
    return data.id;
  },
  onFirstDataRendered: params => params.api.sizeColumnsToFit(),
  defaultColDef: {
    width: 120
  }
};
