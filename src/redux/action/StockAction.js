import {
  RESET_ITEM_STATE,
  ADD_ITEM,
} from '../actiontypeConst/StockActionTypeConst';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const resetItemState = () => ({
  type: RESET_ITEM_STATE,
});
