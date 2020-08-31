import React from 'react';

// screens

// navigations
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ItemStocksDetail from '../pages/tabPages/ItemStocksDetail';
import DeleteStock from '../pages/tabPages/DeleteStock';
import UpdateStock from '../pages/tabPages/UpdateStock';
import SaleItemDetail from '../pages/salePages/SaleItemDetail';
import DeleteSale from '../pages/salePages/DeleteSale';
import UpdateSale from '../pages/salePages/UpdateSale';
const Tab = createBottomTabNavigator();

const SaleTavManage = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          paddingBottom: 12,
        },
        activeBackgroundColor: '#00796B',
      }}>
      <Tab.Screen name="SaleItemDetail" component={SaleItemDetail} />
      <Tab.Screen name="DeleteSale" component={DeleteSale} />
      <Tab.Screen name="UpdateSale" component={UpdateSale} />
    </Tab.Navigator>
  );
};

export default SaleTavManage;
