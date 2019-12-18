## AG-Grid Stress Test using GraphQL and Apollo

![Example](grid.png)

This is a conversion of the [AG-Grid Streaming Stress Test](https://blog.ag-grid.com/streaming-updates-in-javascript-datagrids/) that uses GraphQL and Apollo. A Query is used to initially populate the grid, with subsequent updates handled over websocket with a Subscription.

Performance is very good. There's only one 'trick' employed, which is to set 'fetchPolicy' to 'no-cache' for the subscription.

In the Grid.jsx component:

```js
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
```

This makes sense,because Ag-Grid is already maintaining rowData internally, so also storing it in Apollo's cache would be redundant.

For the purposes of accessing row data in other components, gridApi can be stored in context. Row data can be retrieved using a hook:

```js
import { useContext } from 'react';
import { Context } from '../context';

export const useGridData = () => {
  const {
    state: { gridApi }
  } = useContext(Context);
  if (gridApi) {
    const rows = [];

    gridApi.forEachNode(rowNode => {
      if (rowNode.data) {
        rows.push(rowNode.data);
      }
    });

    return rows;
  }
};
```

Look in the 'context' and 'hooks' directories for the context and hook implementations.

For components that rely on this hook and need to be in time with row updates coming from the subscription, it's necessary to re-set the gridApi object, to notify context consumers. So, useSubscription in Grid.jsx would look like this:

```js
function Grid() {
  const {
    state: { gridApi },
    setGridApi
  } = useContext(Context);

  ....

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

  ...
```

A simple example component using the above hook:

```js
import React from 'react';
import { useGridData } from '../hooks/useGridData';

const Example = () => {
  const data = useGridData();

  console.log(data);

  // Do something with data

  return <div></div>;
};
```

After running `yarn install` in both the root and server directories, start the server with

```
yarn server
```

And then start the app with

```
yarn start
```
