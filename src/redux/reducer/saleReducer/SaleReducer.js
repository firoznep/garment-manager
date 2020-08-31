import {
  ADD_SALE,
  RESET_SALE_STATE,
} from '../../actiontypeConst/SaleActionTypeConst';

const INITIAL_STATE = [];

const SaleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_SALE:
      return [...state, action.payload];
    case RESET_SALE_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default SaleReducer;
