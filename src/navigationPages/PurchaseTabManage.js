import React from 'react';

// screens

// navigations
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PurchseDetail from '../pages/purchasePages/PurchaseItemDetail';

const Tab = createBottomTabNavigator();

const PurchaseTabManage = () => {
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
      <Tab.Screen name="PurchaseDetail" component={PurchseDetail} />
      {/* <Tab.Screen name="DeleteStock" component={DeleteStock} />
      <Tab.Screen name="UpdateStock" component={UpdateStock} /> */}
    </Tab.Navigator>
  );
};

export default PurchaseTabManage;
