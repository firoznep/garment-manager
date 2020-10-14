import {
  ADD_EMP,
  ADD_EMP_PAY,
  ADD_EMP_PRODUCT,
} from '../actiontypeConst/EmployeeActionTypeConst';

export const addEmpAction = (item) => ({
  type: ADD_EMP,
  payload: item,
});

export const addEmpPayAction = (item) => ({
  type: ADD_EMP_PAY,
  payload: item,
});

export const addEmpProductAction = (item) => ({
  type: ADD_EMP_PRODUCT,
  payload: item,
});
