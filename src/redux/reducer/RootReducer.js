import {combineReducers} from 'redux';
import StockReducer from '../reducer/stockReducer/StockReducer';
import CustomerPayReducer from './customerReducer/CustomerPayReducer';
import CustomerReducer from './customerReducer/CustomerReducer';
import EmpPayReducer from './empReducer/EmpPayReducer';
import EmpProductReducer from './empReducer/EmpProductReducer';
import EmpReducer from './empReducer/EmpReducer';
import ProductReducer from './productReducer/ProductReducer';
import PurchaseReducer from './purchaseReducer/PurchaseReducer';
import SaleReducer from './saleReducer/SaleReducer';

export default combineReducers({
  itemStock: StockReducer,
  saleReducer: SaleReducer,
  purchaseReducer: PurchaseReducer,
  empReducer: EmpReducer,
  empPayReducer: EmpPayReducer,
  empProductReducer: EmpProductReducer,
  productReducer: ProductReducer,
  customerReducer: CustomerReducer,
  customerPayReducer: CustomerPayReducer,
});
