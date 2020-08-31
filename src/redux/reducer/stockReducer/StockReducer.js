import {
  ADD_ITEM,
  RESET_ITEM_STATE,
} from '../../actiontypeConst/StockActionTypeConst';

const INITIAL_STATE = [];

const StockReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    case RESET_ITEM_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default StockReducer;
