import {ADD_PURCHASE} from '../../actiontypeConst/PurchaseActionTypeConst';

let INITIAL_STATE = [];

const PurchaseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PURCHASE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default PurchaseReducer;
