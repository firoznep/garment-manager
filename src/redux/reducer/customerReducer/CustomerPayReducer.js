import {ADD_CUSTOMER_PAY} from '../../actiontypeConst/CustomerActionType';

let INITIAL_STATE = [];

const CustomerPayReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CUSTOMER_PAY:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default CustomerPayReducer;
