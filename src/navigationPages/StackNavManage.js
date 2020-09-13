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
          // headerRight: () => (
          //   <TouchableOpacity
          //     style={{padding: 10}}
          //     onPress={() =>
          //       rfr(setStock, setSaleReducer, setResetState, setresetSaleState)
          //     }>
          //     {/* <Image
          //       style={{
          //         width: 30,
          //         height: 23,
          //         tintColor: '#fff',
          //       }}
          //       source={require('../assets/icons/open-menu.png')}
          //     /> */}
          //     <Text style={{color: '#fff', fontWeight: 'bold'}}>Refresh</Text>
          //   </TouchableOpacity>
          // ),

          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: SUB_HEADER_COLOR,
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
