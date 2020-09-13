import {ADD_EMP} from '../../actiontypeConst/EmployeeActionTypeConst';

let INITIAL_STATE = [];

const EmpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_EMP:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default EmpReducer;
