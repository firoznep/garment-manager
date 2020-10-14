import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import nextId from 'react-id-generator';

// FOR DATABASE SQLITE
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'stockDatabase.db'});

import {connect} from 'react-redux';
import {
  BG_COLOR,
  DISABLED_COLOR,
  TITLE_COLOR,
  TXT_COLOR,
} from '../../colorsConst/colorConst';
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import {addEmpPayAction} from '../../redux/action/employeeAction';
import MessageComponent from '../../components/MessageComponent';
import {
  addCustomerAction,
  addCustomerPayAction,
} from '../../redux/action/customerAction';
import DropdownPicker from '../../components/DropdownPicker';

const PayFromCustomer = ({
  cusPayReducer,
  setCusPayReducer,
  customerReducer,
  setCustomerReducer,
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const [date, setDate] = useState(new Date().toDateString());
  const [cusName, setCusName] = useState('');
  const [pay, setPay] = useState('');
  const [des, setDes] = useState('');
  const [isClear, setIsClear] = useState('Pending');

  // const [toBePaid, setToBePaid] = useState('');
  let toBePaid = 0;

  // ADD EMPLOYEES FUNC
  const onEmpPay = () => {
    if (!cusName) {
      alert('Please fill name');
      return;
    }
    if (!pay) {
      alert('Please fill payment');
      return;
    }
    // if (!des) {
    //   alert('Please fill description');
    //   return;
    // }
    if (!date) {
      alert('Please fill date');
      return;
    }

    if (pay > toBePaid || pay == 0) {
      alert('paying amount is greater than or equal to tobepaid!');
      return;
    } else if (pay < toBePaid) {
      db.transaction(function (txn) {
        // INSERT ITEM INTO TABLE
        txn.executeSql(
          'INSERT INTO customer_payment_table (date, customer_name, amount, description, is_clear) values (?,?,?,?,?)',
          [date, cusName, pay, des, 'Pending'],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              setCusName('');
              setPay('');
              setDes('');

              alert('Paid Success');
            } else {
              alert('Process Failed');
            }
          },
        );
      });
    } else {
      db.transaction(function (txn) {
        // INSERT ITEM INTO TABLE
        txn.executeSql(
          'INSERT INTO customer_payment_table (date, customer_name, amount, description, is_clear) values (?,?,?,?,?)',
          [date, cusName, pay, des, 'Clear'],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              setCusName('');
              setPay('');
              setDes('');

              alert(`Full Paid success From ${cusName}`);
            } else {
              alert('Process Failed');
            }
          },
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE customer_payment_table set is_clear=? where customer_name = ?',
          ['Clear', cusName],

          (tx, results) => {
            // console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert('Successfully updated payment');
            } else alert('Updation Failed');
          },
        );
      });

      // if (pay === toBePaid) {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE sale_table set is_clear=? where customer_name = ?',
          ['Paid', cusName],

          (tx, results) => {
            // console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              setCusName('');
              setPay('');
              setDes('');

              alert('Successfully updated');
            } else alert('Updation Failed');
          },
        );
      });
      // }
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'yellow', padding: 10}}>
      {/* Date */}
      <CustomInput
        title="Date"
        placeholder="Date"
        onChangeText={(qnt) => setDate(qnt)}
        // maxLength={7}
        // keyboardType="numeric"
        value={date}
      />

      {/* CUSTOMER NAME */}
      <DropdownPicker
        title="Customer Name"
        name="customer_name"
        selectedValue={cusName}
        onValueChange={(n) => setCusName(n)}
        dropdownList={customerReducer}
      />

      {/* PAYMENT */}
      <CustomInput
        title="Payment"
        placeholder="Payment"
        onChangeText={(qnt) => setPay(qnt)}
        maxLength={9}
        keyboardType="numeric"
        value={pay}
      />

      {/* Description */}
      <CustomInput
        title="Description"
        placeholder="Description"
        onChangeText={(qnt) => setDes(qnt)}
        value={des}
      />
      <CustomBtn title="Submit" onBtnPress={onEmpPay} />
      {/* <GetTotal /> */}
      {/* <GetTotalPay /> */}
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  empReducer: state.empReducer.reverse(),
  empPayReducer: state.empPayReducer.reverse(),
  empProductReducer: state.empProductReducer.reverse(),

  customerReducer: state.customerReducer.reverse(),

  cusPayReducer: state.customerPayReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setCustomerReducer: (stk) => dispatch(addCustomerAction(stk)),

  setCustomerReducer: (stk) => dispatch(addCustomerPayAction(stk)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PayFromCustomer);
