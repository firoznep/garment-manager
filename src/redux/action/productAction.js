import {ADD_PRODUCT} from '../actiontypeConst/ProductActionTypeConst';

export const addProductAction = (item) => ({
  type: ADD_PRODUCT,
  payload: item,
});
