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
