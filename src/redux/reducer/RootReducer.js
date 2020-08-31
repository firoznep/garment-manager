import {combineReducers} from 'redux';
import StockReducer from '../reducer/stockReducer/StockReducer';
import SaleReducer from './saleReducer/SaleReducer';

export default combineReducers({
  itemStock: StockReducer,
  saleReducer: SaleReducer,
});
