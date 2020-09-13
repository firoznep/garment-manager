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
import SaleTavManage from './src/navigationPages/SaleTavManage';
import PurchaseTabManage from './src/navigationPages/PurchaseTabManage';
import EmployeesTabManage from './src/navigationPages/EmployeesTabManage';

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

        if (res.rows.length <= 5) {
          txn.executeSql('DROP TABLE IF EXISTS stock_table', [], (tx, res) => {
            console.log('stock table deleted');
          });

          txn.executeSql('DROP TABLE IF EXISTS sale_table', [], (tx, res) => {
            console.log('sale table deleted');
          });

          txn.executeSql(
            'DROP TABLE IF EXISTS purchase_table',
            [],
            (tx, res) => {
              console.log('purchase table deleted');
            },
          );

          txn.executeSql(
            'DROP TABLE IF EXISTS employee_table',
            [],
            (tx, res) => {
              console.log('employee table deleted');
            },
          );

          txn.executeSql(
            'DROP TABLE IF EXISTS emp_product_ready_table',
            [],
            (tx, res) => {
              console.log('emp_product_ready_table deleted');
            },
          );

          // STOCK TABLE................................
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS stock_table(item_id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(50), img_data VARCHAR(255), item_name VARCHAR(50), item_size VARCHAR(20), quantity INT(10), unit VARCHAR(15), unit_rate INT(10), ext INT(10), total_amount INT(50))',
            [],
            (tx, res) => {
              console.log('stock_table created');
            },
          );

          // PURCHASE TABLE ........................................
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS purchase_table(purchase_id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(50), inv_num INT(10), img_data VARCHAR(255), item_name VARCHAR(50), item_size VARCHAR(20), quantity INT(10), unit VARCHAR(15), unit_rate INT(10), total_amount INT(50))',
            [],
            (tx, res) => {
              console.log('purchase created');
            },
          );

          // SALE TABLE ........................................
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS sale_table(item_id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(50), env_num INT(10), customer_name INT(40), customer_address, customer_contact, item_name VARCHAR(40), item_size VARCHAR(20), qnt INT(10), unit VARCHAR(20), sale_rate INT(10), discount INT(10), total_amt INT(50), paid INT(10), balance INT(50))',
            [],
            (tx, res) => {
              console.log('sale_table created');
            },
          );

          // Employees TABLE ........................................
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS employee_table(employee_id INTEGER PRIMARY KEY AUTOINCREMENT, hire_date VARCHAR(50), emp_name VARCHAR(40), job_title VARCHAR(20), emp_address VARCHAR(50), emp_contact INT(10))',
            [],
            (tx, res) => {
              console.log('employee_table created');
            },
          );

          // emp_product_ready_table........................................
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS emp_product_ready_table(emp_product_id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(50), emp_name VARCHAR(40), product_name VARCHAR(20), qnt INT(10), unit_rate INT(10), total_amt INT(50), is_clear VARCHAR(20))',
            [],
            (tx, res) => {
              console.log('emp_product_ready_table created');
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
        }}
        drawerPosition="right">
        <Drawer.Screen
          name="Dashboard"
          component={StackNavManage}
          // options={{drawerLabel: 'Home'}}
        />
        <Drawer.Screen name="ItemStockDetail" component={TabNavManage} />
        <Drawer.Screen name="SaleDetail" component={SaleTavManage} />
        <Drawer.Screen name="PurchaseTabManage" component={PurchaseTabManage} />
        <Drawer.Screen
          name="EmployeesTabMange"
          component={EmployeesTabManage}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
