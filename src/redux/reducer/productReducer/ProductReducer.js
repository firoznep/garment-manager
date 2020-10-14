import {ADD_PRODUCT} from '../../actiontypeConst/ProductActionTypeConst';

let INITIAL_STATE = [];

const ProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default ProductReducer;
