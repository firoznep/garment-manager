import React from 'react';

// screens

// navigations
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddEmployees from '../pages/employees/AddEmployees';
import AddEmpProduct from '../pages/employees/AddEmpProduct';
import EmployeesDetail from '../pages/employees/EmployeesDetail';
import EmployeesProductDetail from '../pages/employees/EmpProductDetail';

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
      <Tab.Screen name="EmpProductDetail" component={EmployeesProductDetail} />
      <Tab.Screen name="EmployeesDetail" component={EmployeesDetail} />
      {/* <Tab.Screen name="DeleteStock" component={DeleteStock} />
      <Tab.Screen name="UpdateStock" component={UpdateStock} /> */}
    </Tab.Navigator>
  );
};

export default EmployeesTabManage;
