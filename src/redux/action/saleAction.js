import {
  ADD_SALE,
  RESET_SALE_STATE,
} from '../actiontypeConst/SaleActionTypeConst';

// FOR SALE
export const addSale = (sale) => ({
  type: ADD_SALE,
  payload: sale,
});

export const resetSaleState = () => ({
  type: RESET_SALE_STATE,
});
