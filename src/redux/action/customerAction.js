import {
  ADD_CUSTOMER,
  ADD_CUSTOMER_PAY,
} from '../actiontypeConst/CustomerActionType';

export const addCustomerAction = (item) => ({
  type: ADD_CUSTOMER,
  payload: item,
});

export const addCustomerPayAction = (item) => ({
  type: ADD_CUSTOMER_PAY,
  payload: item,
});
