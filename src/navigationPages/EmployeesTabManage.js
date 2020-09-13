import React from 'react';

// screens

// navigations
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddEmployees from '../pages/employees/AddEmployees';
import AddEmpProduct from '../pages/employees/AddEmpProduct';

const Tab = createBottomTabNavigator();

const EmployeesTabManage = () => {
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
      <Tab.Screen name="AddEmployees" component={AddEmpProduct} />
      {/* <Tab.Screen name="DeleteStock" component={DeleteStock} />
      <Tab.Screen name="UpdateStock" component={UpdateStock} /> */}
    </Tab.Navigator>
  );
};

export default EmployeesTabManage;
