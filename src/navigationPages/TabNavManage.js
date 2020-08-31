import React from 'react';

// screens

// navigations
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ItemStocksDetail from '../pages/tabPages/ItemStocksDetail';
import DeleteStock from '../pages/tabPages/DeleteStock';
import UpdateStock from '../pages/tabPages/UpdateStock';
const Tab = createBottomTabNavigator();

const TabNavManage = () => {
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
      <Tab.Screen name="ItemStocksDetail" component={ItemStocksDetail} />
      <Tab.Screen name="DeleteStock" component={DeleteStock} />
      <Tab.Screen name="UpdateStock" component={UpdateStock} />
    </Tab.Navigator>
  );
};

export default TabNavManage;
