import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ChangeStatusBarColor from '../../components/ChangeStatusBarColor';

// FOR DATABASE SQLITE
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'stockDatabase.db'});

// COMPONENTS
import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';
import {connect} from 'react-redux';

import nextId from 'react-id-generator';
import {addCustomerAction} from '../../redux/action/customerAction';

// MAIN FUNCTION ===============================================================
const AddCustomer = ({customerReducer, setCustomerReducer}) => {
  // STATES
  const [date, setDate] = useState(new Date().toDateString());
  const [cusName, setCusName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  // DISPLAY DATA ON SCREEN
  const [renderCusList, setCusList] = useState([]);

  // ADD EMPLOYEES FUNC
  const onAddEmp = () => {
    if (!cusName) {
      alert('Please fill name');
      return;
    }

    if (!address) {
      alert('Please fill address');
      return;
    }

    if (!contact) {
      alert('Please fill contact');
      return;
    }

    db.transaction(function (txn) {
      // INSERT ITEM INTO TABLE
      txn.executeSql(
        'INSERT INTO customer_table (date, customer_name, customer_address, customer_contact) values (?,?,?,?)',
        [date, cusName, address, contact],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            setCusName('');
            setAddress('');
            setContact('');

            alert('Customer added successfully');
          } else {
            alert('Process Failed');
          }
        },
      );
    });

    setCustomerReducer({
      date: date,
      customer_name: cusName,
      customer_address: address,
      customer_contact: contact,
    });

    setCusList([
      ...renderCusList,
      {
        date: date,
        customer_name: cusName,
        customer_address: address,
        customer_contact: contact,
      },
    ]);
  };

  return (
    <SafeAreaView>
      <ChangeStatusBarColor
        backgroundColor={'#0097A7'}
        barStyle="dark-content"
      />

      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          {/* CUSTOMER NAME */}
          <CustomInput
            placeholder="Customer Name"
            title="Customer name"
            onChangeText={(n) => setCusName(n.trim())}
            value={cusName}
            autoCapitalize="words"
          />

          {/* ADDRESS */}
          <CustomInput
            placeholder="Address"
            title="Address"
            onChangeText={(n) => setAddress(n.trim())}
            value={address}
          />

          {/* CONTACT*/}
          <CustomInput
            placeholder="Contact"
            title="Contact"
            onChangeText={(n) => setContact(n)}
            value={contact}
            keyboardType="numeric"
            maxLength={10}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <CustomBtn title="Add" onBtnPress={onAddEmp} />

      {/* FOR DISPLAY ADDED ITEMS ON SCREEN */}
      <View
        style={{
          backgroundColor: 'gray',
          marginVertical: 10,
          maxHeight: 250,
          width: '100%',
          alignItems: 'flex-start',
        }}>
        <ScrollView>
          {renderCusList.map((v) => (
            <View
              key={nextId()}
              style={{
                marginVertical: 5,
                backgroundColor: 'green',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              <View style={styles.content}>
                <Text>Date: {v.date}</Text>
              </View>
              <View style={styles.content}>
                <Text>Customer Name: {v.customer_name}</Text>
              </View>

              <View style={styles.content}>
                <Text>Address: {v.customer_address}</Text>
              </View>

              <View style={styles.content}>
                <Text>Contact: {v.customer_contact}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 5,
  },
});

const mapStateToProps = (state) => ({
  customerReducer: state.customerReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setCustomerReducer: (stk) => dispatch(addCustomerAction(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
