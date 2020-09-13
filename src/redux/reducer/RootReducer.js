import {combineReducers} from 'redux';
import StockReducer from '../reducer/stockReducer/StockReducer';
import EmpProductReducer from './empReducer/EmpProductReducer';
import EmpReducer from './empReducer/EmpReducer';
import PurchaseReducer from './purchaseReducer/PurchaseReducer';
import SaleReducer from './saleReducer/SaleReducer';

export default combineReducers({
  itemStock: StockReducer,
  saleReducer: SaleReducer,
  purchaseReducer: PurchaseReducer,
  empReducer: EmpReducer,
  empProductReducer: EmpProductReducer,
});
