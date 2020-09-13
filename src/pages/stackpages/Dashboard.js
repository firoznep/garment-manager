import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, TouchableHighlight} from 'react-native';
import ChangeStatusBarColor from '../../components/ChangeStatusBarColor';
import {HEADER_COLOR, BG_COLOR} from '../../colorsConst/colorConst';
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
  addEmpProductAction,
} from '../../redux/action/employeeAction';

const Dashboard = ({
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
}) => {
  useEffect(() => {
    rfr();
  }, []);

  const rfr = () => {
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
        'SELECT * FROM emp_product_ready_table',
        [],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            setEmpProductReducer(results.rows.item(i));
          }
        },
      );
    });
  };

  return (
    <View style={{alignItems: 'center'}}>
      <ChangeStatusBarColor
        barStyle="light-content"
        backgroundColor={HEADER_COLOR}
      />
      <TouchableHighlight style={{padding: 10, backgroundColor: BG_COLOR}}>
        <Text style={{color: '#fff'}}>Refresh</Text>
      </TouchableHighlight>
      <Text>Item Stock length: {itemStock.length}</Text>
      <Text>sale items length: {saleReducer.length}</Text>
      <Text>purchase items length: {purchaseReducer.length}</Text>
      <Text>Employees length: {empReducer.length}</Text>
      <Text>Employees Product length: {empProductReducer.length}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  itemStock: state.itemStock.reverse(),
  purchaseReducer: state.purchaseReducer.reverse(),
  saleReducer: state.saleReducer.reverse(),
  empReducer: state.empReducer.reverse(),
  empProductReducer: state.empProductReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
  // setResetState: () => dispatch(resetItemState()),

  setPurchaseReducer: (pur) => dispatch(addPurchaseAction(pur)),

  setSaleReducer: (stk) => dispatch(addSale(stk)),
  // setresetSaleState: () => dispatch(resetSaleState()),

  setEmpReducer: (stk) => dispatch(addEmpAction(stk)),

  setEmpProductReducer: (stk) => dispatch(addEmpProductAction(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
