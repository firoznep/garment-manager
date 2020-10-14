import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../pages/stackpages/Dashboard';
import {HEADER_COLOR, SUB_HEADER_COLOR} from '../colorsConst/colorConst';
import {TouchableOpacity, Image, StatusBar, Text} from 'react-native';
import AddStocksItem from '../pages/tabPages/AddStocksItem';
import AddSaleItem from '../pages/salePages/AddSaleItem';
import {connect} from 'react-redux';
import {addItem, resetItemState} from '../redux/action/StockAction';
import {addSale, resetSaleState} from '../redux/action/saleAction';
import {rfr} from '../components/refreshStockAndSale';
import PurchseDetail from '../pages/purchasePages/PurchaseItemDetail';
import AddPurchase from '../pages/purchasePages/AddPurchase';
import AddEmployees from '../pages/employees/AddEmployees';
import AddEmpProduct from '../pages/employees/AddEmpProduct';
import EmpPayPage from '../pages/employees/EmpPayPage';
import CustomerDetail from '../pages/customerPages/CustomerDetail';
import AddCustomer from '../pages/customerPages/AddCustomer';
import PayFromCustomer from '../pages/customerPages/PayFromCustomer';

const Stack = createStackNavigator();

const StackNavManage = ({
  navigation,
  setStock,
  setSaleReducer,
  setResetState,
  setresetSaleState,
}) => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          headerLeft: () => (
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => navigation.toggleDrawer()}>
              <Image
                style={{
                  width: 30,
                  height: 23,
                  tintColor: '#fff',
                }}
                source={require('../assets/icons/open-menu.png')}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: HEADER_COLOR,
          },
          safeAreaInsets: {top: 0},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center',
          },
        }}
      />
      <Stack.Screen
        name="AddStocksItem"
        component={AddStocksItem}
        options={{
          // headerLeft: () => (
          //   <TouchableOpacity
          //     style={{padding: 10}}
          //     onPress={() => navigation.goBack()}>
          //     {/* <Image
          //       style={{
          //         width: 30,
          //         height: 23,
          //         tintColor: '#fff',
          //       }}
          //       source={require('../assets/icons/open-menu.png')}
          //     /> */}
          //     <Text style={{fontSize: 24, color: '#fff', fontWeight: 'bold'}}>
          //       &#8592;
          //     </Text>
          //   </TouchableOpacity>
          // ),

          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: SUB_HEADER_COLOR,
          },
        }}
      />
      <Stack.Screen
        name="AddSaleItem"
        component={AddSaleItem}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() =>
                rfr(setStock, setSaleReducer, setResetState, setresetSaleState)
              }>
              {/* <Image
                style={{
                  width: 30,
                  height: 23,
                  tintColor: '#fff',
                }}
                source={require('../assets/icons/open-menu.png')}
              /> */}
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Refresh</Text>
            </TouchableOpacity>
          ),

          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: SUB_HEADER_COLOR,
          },
        }}
      />

      {/* PURCHASE DETAIL PAGE */}
      <Stack.Screen
        name="AddPurchase"
        component={AddPurchase}
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: SUB_HEADER_COLOR,
          },
        }}
      />

      {/* EMPLOYEES DETAIL PAGE */}
      <Stack.Screen
        name="AddEmployees"
        component={AddEmployees}
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#0097A7',
          },
        }}
      />

      {/* EMPLOYEES PRODUCT DETAIL PAGE */}
      <Stack.Screen
        name="AddEmpProduct"
        component={AddEmpProduct}
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'orange',
          },
        }}
      />

      {/* EMPLOYEES PAY PAGE */}
      <Stack.Screen
        name="EmpPayPage"
        component={EmpPayPage}
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'orange',
          },
        }}
      />

      {/* CUSTOMER PAGE */}
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetail}
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'orange',
          },
        }}
      />

      {/* ADDCUSTOMER PAGE */}
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomer}
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#0097A7',
          },
        }}
      />

      {/* PAYFROMCUSTOMER PAGE */}
      <Stack.Screen
        name="PayFromCustomer"
        component={PayFromCustomer}
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#0097A7',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
  setResetState: () => dispatch(resetItemState()),

  setSaleReducer: (stk) => dispatch(addSale(stk)),
  setresetSaleState: () => dispatch(resetSaleState()),
});

export default connect(null, mapDispatchToProps)(StackNavManage);
