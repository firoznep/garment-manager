import {ADD_PURCHASE} from '../actiontypeConst/PurchaseActionTypeConst';

export const addPurchaseAction = (item) => ({
  type: ADD_PURCHASE,
  payload: item,
});
