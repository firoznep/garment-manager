import React from 'react';

// screens

// navigations
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProductDetail from '../pages/productPages/ProductDetail';
import {BROWNSEVEN} from '../colorsConst/colorConst';

const Tab = createBottomTabNavigator();

const ProductTabManage = () => {
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
        activeBackgroundColor: '#3E2723',
      }}>
      <Tab.Screen name="ProductDetail" component={ProductDetail} />
      {/* <Tab.Screen name="EmployeesDetail" component={EmployeesDetail} /> */}
    </Tab.Navigator>
  );
};

export default ProductTabManage;
