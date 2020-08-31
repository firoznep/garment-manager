import React, {useEffect} from 'react';
import {View, Text, StatusBar, TouchableHighlight} from 'react-native';
import ChangeStatusBarColor from '../../components/ChangeStatusBarColor';
import {HEADER_COLOR} from '../../colorsConst/colorConst';
import {connect} from 'react-redux';

// FOR DATABASE SQLITE
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'stockDatabase.db'});

import {addItem, resetItemState} from '../../redux/action/StockAction';
import {addSale, resetSaleState} from '../../redux/action/saleAction';

const Dashboard = ({
  itemStock,
  setStock,
  saleReducer,
  setResetState,
  setSaleReducer,
  setresetSaleState,
}) => {
  useEffect(() => {
    rfr();
  }, []);

  const rfr = () => {
    setResetState();
    setresetSaleState();
    // STORE DATA INTO STOCK REDUCER
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM stock_table', [], (tx, results) => {
        // if (itemStock.length < results.rows.length) {
        let dt = [];
        for (let i = 0; i < results.rows.length; ++i) {
          dt.push(results.rows.item(i));
        }
        dt.map((v) => setStock(v));
      });
    });

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM sale_table', [], (tx, results) => {
        let d = [];
        for (let i = 0; i < results.rows.length; ++i) {
          d.push(results.rows.item(i));
        }
        d.map((v) => setSaleReducer(v));
      });
    });
  };
  return (
    <View style={{alignItems: 'center'}}>
      <ChangeStatusBarColor
        barStyle="light-content"
        backgroundColor={HEADER_COLOR}
      />
      <TouchableHighlight onPress={rfr}>
        <Text>Refresh</Text>
      </TouchableHighlight>
      <Text>Item Stock length: {itemStock.length}</Text>
      <Text>Item Stock length: {saleReducer.length}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  itemStock: state.itemStock.reverse(),

  saleReducer: state.saleReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
  setResetState: () => dispatch(resetItemState()),

  setSaleReducer: (stk) => dispatch(addSale(stk)),
  setresetSaleState: () => dispatch(resetSaleState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
