import {ADD_EMP_PAY} from '../../actiontypeConst/EmployeeActionTypeConst';

let INITIAL_STATE = [];

const EmpPayReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_EMP_PAY:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default EmpPayReducer;
