import {ADD_EMP_PRODUCT} from '../../actiontypeConst/EmployeeActionTypeConst';

let INITIAL_STATE = [];

const EmpProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_EMP_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default EmpProductReducer;
