// In App.js in a new project

import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

// FOR NAVIGATION
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// FOR DATABASE SQLITE
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'stockDatabase.db'});

// SPLASH SCREEN
import SplashScreen from 'react-native-splash-screen';

import StackNavManage from './src/navigationPages/StackNavManage';
import TabNavManage from './src/navigationPages/TabNavManage';
import {HEADER_COLOR, DISABLED_COLOR} from './src/colorsConst/colorConst';
import SaleTavManage from './src/navigationPages/SaleTavManage';

const Drawer = createDrawerNavigator();

function App() {
  // useEffect(() => {
  SplashScreen.hide();

  // CREATE TABLE
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table'",
      [],
      function (tx, res) {
        console.log('table length: ', res.rows.length);

        if (res.rows.length === 5) {
          txn.executeSql('DROP TABLE IF EXISTS stock_table', [], (tx, res) => {
            console.log('stock table deleted');
          });
          txn.executeSql('DROP TABLE IF EXISTS sale_table', [], (tx, res) => {
            console.log('sale table deleted');
          });

          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS stock_table(item_id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(50), img_data VARCHAR(255), item_name VARCHAR(50), item_size VARCHAR(20), quantity INT(10), unit VARCHAR(15), unit_rate INT(10),total_amount INT(50), description VARCHAR(100))',
            [],
            (tx, res) => {
              console.log('stock_table created');
            },
          );

          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS sale_table(item_id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(50), env_num INT(10), customer_name INT(40),item_name VARCHAR(40), item_size VARCHAR(20), qnt INT(10), unit VARCHAR(20), sale_rate INT(10), discount INT(10), total_amt INT(50),on_cash VARCHAR(10))',
            [],
            (tx, res) => {
              console.log('sale_table created');
            },
          );
        }
      },
    );
  });
  // }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          // backgroundColor: DISABLED_COLOR,
          width: 240,
        }}
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}>
        <Drawer.Screen
          name="Dashboard"
          component={StackNavManage}
          options={{drawerLabel: 'Home'}}
        />
        <Drawer.Screen name="ItemStockDetail" component={TabNavManage} />
        <Drawer.Screen name="SaleDetail" component={SaleTavManage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
