import createStateContext from './createStateContext';

const gridApiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GRIDAPI': {
      return {
        ...state,
        gridApi: action.gridApi
      };
    }
    default:
      return state;
  }
};

const setGridApi = dispatch => gridApi => {
  dispatch({
    type: 'SET_GRIDAPI',
    gridApi
  });
};

export const { Context, Provider } = createStateContext(
  gridApiReducer,
  { setGridApi },
  { gridApi: null }
);
