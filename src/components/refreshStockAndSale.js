// DATABASE
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'stockDatabase.db'});

// REFRESH DATA
export const rfr = (
  setStock,
  setSaleReducer,
  setResetState,
  setresetSaleState,
) => {
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
