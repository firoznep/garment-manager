import {ADD_CUSTOMER} from '../../actiontypeConst/CustomerActionType';

let INITIAL_STATE = [];

const CustomerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default CustomerReducer;
