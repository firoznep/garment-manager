import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

// RANDOM ID GENERATE
import nextId from 'react-id-generator';

import ChangeStatusBarColor from '../../components/ChangeStatusBarColor';
import {HEADER_COLOR, BG_COLOR, TXT_COLOR} from '../../colorsConst/colorConst';
import {connect} from 'react-redux';

// FOR DATABASE SQLITE
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'stockDatabase.db'});

import {addItem, resetItemState} from '../../redux/action/StockAction';
import {addSale, resetSaleState} from '../../redux/action/saleAction';
import AddPurchase from '../purchasePages/AddPurchase';
import {addPurchaseAction} from '../../redux/action/purchaseAction';
import {
  addEmpAction,
  addEmpPayAction,
  addEmpProductAction,
} from '../../redux/action/employeeAction';
import {addProductAction} from '../../redux/action/productAction';
import {
  addCustomerAction,
  addCustomerPayAction,
} from '../../redux/action/customerAction';

const Dashboard = ({
  productReducer,
  setProductReducer,

  itemStock,
  setStock,

  saleReducer,
  setSaleReducer,

  purchaseReducer,
  setPurchaseReducer,

  empReducer,
  setEmpReducer,

  empProductReducer,
  setEmpProductReducer,

  customerReducer,
  setCustomerReducer,

  empPayReducer,
  setEmpPayReducer,

  cusPayReducer,
  setCusPayReducer,

  navigation,
}) => {
  useEffect(() => {
    rfr();
  }, []);

  const rfr = () => {
    // STORE DATA INTO PRODUCT REDUCER
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM product_table', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          setProductReducer(results.rows.item(i));
        }
      });
    });

    // STORE DATA INTO PRODUCT REDUCER
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM employee_payment_table WHERE is_clear = ?',
        ['Pending'],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            setEmpPayReducer(results.rows.item(i));
          }
        },
      );
    });

    // STORE DATA INTO PRODUCT REDUCER
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM customer_payment_table WHERE is_clear = ?',
        ['Pending'],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            setCusPayReducer(results.rows.item(i));
          }
        },
      );
    });

    // STORE DATA INTO STOCK REDUCER
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM stock_table', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          setStock(results.rows.item(i));
        }
      });
    });

    // STORE DATA INTO purchase REDUCER
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM purchase_table', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          setPurchaseReducer(results.rows.item(i));
        }
      });
    });

    // STORE DATA INTO SALE_TABLE
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM sale_table', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          setSaleReducer(results.rows.item(i));
        }
      });
    });

    // STORE DATA INTO EMP_TABLE
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM employee_table', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          setEmpReducer(results.rows.item(i));
        }
      });
    });

    // STORE DATA INTO emp_product_ready_table
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM emp_product_ready_table WHERE is_clear = ?',
        ['Pending'],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            setEmpProductReducer(results.rows.item(i));
          }
        },
      );
    });

    // STORE DATA INTO customer_table
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM customer_table', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          setCustomerReducer(results.rows.item(i));
        }
      });
    });
  };

  return (
    <View style={{alignItems: 'center'}}>
      <ChangeStatusBarColor
        barStyle="light-content"
        backgroundColor={HEADER_COLOR}
      />

      <Text>Product length: {productReducer.length}</Text>
      <Text>Item Stock length: {itemStock.length}</Text>
      <Text>sale items length: {saleReducer.length}</Text>
      <Text>purchase items length: {purchaseReducer.length}</Text>
      <Text>Employees length: {empReducer.length}</Text>
      <Text>Employees Product length: {empProductReducer.length}</Text>

      {/* CUSTOMER DETAIL */}
      <TouchableOpacity
        style={{padding: 10, marginVertical: 5, backgroundColor: 'purple'}}
        onPress={() => navigation.navigate('CustomerDetail')}>
        <Text style={{color: '#fff'}}>
          Customer length: {customerReducer.length}
        </Text>
      </TouchableOpacity>

      {/* EMPLOYEE PAY DETAIL */}
      <TouchableOpacity
        style={{padding: 10, marginVertical: 5, backgroundColor: 'purple'}}
        onPress={() => navigation.navigate('EmpPayPage')}>
        <Text style={{color: '#fff'}}>
          emp pay length: {empPayReducer.length}
        </Text>
      </TouchableOpacity>

      {/* CUSTOMER PAY DETAIL */}
      <TouchableOpacity
        style={{padding: 10, marginVertical: 5, backgroundColor: 'purple'}}
        onPress={() => navigation.navigate('PayFromCustomer')}>
        <Text style={{color: '#fff'}}>
          Customer pay length: {cusPayReducer.length}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  productReducer: state.productReducer.reverse(),
  itemStock: state.itemStock.reverse(),
  purchaseReducer: state.purchaseReducer.reverse(),
  saleReducer: state.saleReducer.reverse(),
  empReducer: state.empReducer.reverse(),
  empProductReducer: state.empProductReducer.reverse(),
  customerReducer: state.customerReducer.reverse(),
  empPayReducer: state.empPayReducer.reverse(),
  cusPayReducer: state.customerPayReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
  // setResetState: () => dispatch(resetItemState()),

  setPurchaseReducer: (pur) => dispatch(addPurchaseAction(pur)),

  setSaleReducer: (stk) => dispatch(addSale(stk)),
  // setresetSaleState: () => dispatch(resetSaleState()),

  setProductReducer: (stk) => dispatch(addProductAction(stk)),

  setEmpReducer: (stk) => dispatch(addEmpAction(stk)),

  setEmpProductReducer: (stk) => dispatch(addEmpProductAction(stk)),

  setCustomerReducer: (stk) => dispatch(addCustomerAction(stk)),

  setCusPayReducer: (stk) => dispatch(addCustomerPayAction(stk)),

  setEmpPayReducer: (stk) => dispatch(addEmpPayAction(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
