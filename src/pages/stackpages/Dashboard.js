import React, {useEffect, useState} from 'react';
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

  const [tLen, setTLen] = useState('');
  const [tRow1, settRow1] = useState('');
  const [tRow2, settRow2] = useState('');
  const [tRow3, settRow3] = useState('');
  const [tRow4, settRow4] = useState('');

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

    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table'",
        [],
        function (tx, res) {
          let d = [];
          for (let i = 0; i < res.rows.length; ++i) {
            d.push(res.rows.item(i));
          }
          setTLen(d.length);
          settRow1(d[0].name);
          settRow2(d[1].name);
          settRow3(d[2].name);
          settRow4(d[3].name);
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
      <TouchableHighlight onPress={rfr}>
        <Text>Refresh</Text>
      </TouchableHighlight>
      <Text>Item Stock length: {itemStock.length}</Text>
      <Text>sale items length: {saleReducer.length}</Text>
      <Text>table length: {tLen}</Text>
      <Text>table 1: {tRow1}</Text>
      <Text>table 2: {tRow2}</Text>
      <Text>table 3: {tRow3}</Text>
      <Text>table 4: {tRow4}</Text>
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
