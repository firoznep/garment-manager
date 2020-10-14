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

import nextId from 'react-id-generator';

// FOR DATABASE SQLITE
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'stockDatabase.db'});

// COMPONENTS
import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';
import {connect} from 'react-redux';
import {
  addEmpAction,
  addEmpProductAction,
} from '../../redux/action/employeeAction';
import DropdownPicker from '../../components/DropdownPicker';
import MessageComponent from '../../components/MessageComponent';
import {Picker} from '@react-native-community/picker';

// MAIN FUNCTION ===============================================================
const AddEmpProduct = ({
  itemStock,
  empReducer,
  setEmpReducer,
  empProductReducer,
  setEmpProductReducer,

  productReducer,
}) => {
  // STATES
  const [date, setDate] = useState(new Date().toDateString());
  const [empName, setEmpName] = useState('');
  const [productName, setProductName] = useState('');
  const [qnt, setQnt] = useState('');
  const [unitRate, setUnitRate] = useState('');
  const [isPaid, setIsPaid] = useState('Pending');

  let totalAmt = qnt * unitRate;

  // DISPLAY DATA ON SCREEN
  const [renderEmpProductList, setEmpProductList] = useState([]);

  // SET SUCCESS MESSAGE
  const [updateMsg, setUpdateMsg] = useState(false);

  useEffect(() => {
    setUpdateMsg(false);
  }, []);

  // ADD EMPLOYEES FUNC
  const onAddEmpProduct = () => {
    if (!empName) {
      alert('Please fill name');
      return;
    }
    if (!productName) {
      alert('Please fill product name');
      return;
    }
    if (!qnt) {
      alert('Please fill quantity');
      return;
    }
    if (!unitRate) {
      alert('Please fill unitRate');
      return;
    }

    db.transaction(function (txn) {
      // INSERT ITEM INTO TABLE
      txn.executeSql(
        'INSERT INTO emp_product_ready_table (date, emp_name, product_name, qnt, unit_rate, total_amt, is_clear) values (?,?,?,?,?,?,?)',
        [date, empName, productName, qnt, unitRate, totalAmt, isPaid],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            setQnt('');
            setUnitRate('');

            setUpdateMsg(true);
            setTimeout(() => {
              setUpdateMsg(false);
            }, 2000);
          } else {
            alert('Process Failed');
          }
        },
      );
    });

    setEmpProductReducer({
      emp_product_id: nextId(),
      date: date,
      emp_name: empName,
      product_name: productName,
      qnt: qnt,
      unit_rate: unitRate,
      total_amt: totalAmt,
      is_clear: isPaid,
    });

    setEmpProductList([
      {
        emp_product_id: nextId(),
        date: date,
        emp_name: empName,
        product_name: productName,
        qnt: qnt,
        unit_rate: unitRate,
        total_amt: totalAmt,
        is_clear: isPaid,
      },
      ...renderEmpProductList,
    ]);
  };

  return (
    <SafeAreaView>
      <ChangeStatusBarColor
        backgroundColor={'orange'}
        // barStyle="dark-content"
      />

      {/* SUCCESS MESSAGE */}
      {updateMsg ? <MessageComponent title="Item added to list" /> : null}

      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          {/* <SwitchBetweenPickerAndInput
            title="Select Employee Name"
            name="emp_name"
            selectedValue={empName}
            onValueChange={(n) => setEmpName(n.trim().toUpperCase())}
            dropdownList={empReducer}
          /> */}
          {/* EMPLOYEE NAME */}
          <DropdownPicker
            title="Employee Name"
            name="emp_name"
            selectedValue={empName}
            onValueChange={(n) => setEmpName(n)}
            dropdownList={empReducer}
          />

          {/* PRODUCT NAME */}
          <DropdownPicker
            title="Product Name"
            name="product_name"
            selectedValue={productName}
            onValueChange={(n) => setProductName(n)}
            dropdownList={productReducer}
          />

          {/* <SwitchBetweenPickerAndInput
            title="Select Product Name"
            name="item_name"
            selectedValue={productName}
            onValueChange={(n) => setProductName(n.trim().toUpperCase())}
            dropdownList={itemStock}
          /> */}

          {/* quantity */}
          <CustomInput
            title="Quantity"
            placeholder="Quantity"
            onChangeText={(qnt) => setQnt(qnt)}
            maxLength={10}
            keyboardType="numeric"
            value={qnt}
          />

          {/* UnitRate */}
          <CustomInput
            title="UnitRate"
            placeholder="UnitRate"
            onChangeText={(qnt) => setUnitRate(qnt)}
            maxLength={10}
            keyboardType="numeric"
            value={unitRate}
          />

          {/* IS PAID */}

          <View style={{borderBottomWidth: 1, borderBottomColor: 'blue'}}>
            <Picker
              style={{color: 'blue', width: 130}}
              selectedValue={isPaid}
              onValueChange={(v) => setIsPaid(v)}>
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Paid" value="Paid" />
            </Picker>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <CustomBtn title="Add" onBtnPress={onAddEmpProduct} />

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
          {renderEmpProductList.map((v) => (
            <View
              key={`${v.emp_product_id}`}
              style={{
                marginVertical: 5,
                backgroundColor: 'green',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              <View style={styles.content}>
                <Text>Emp ID: {v.emp_product_id}</Text>
              </View>
              <View style={styles.content}>
                <Text>Date: {v.date}</Text>
              </View>
              <View style={styles.content}>
                <Text>Employee Name: {v.emp_name}</Text>
              </View>
              <View style={styles.content}>
                <Text>product name: {v.product_name}</Text>
              </View>

              <View style={styles.content}>
                <Text>Quantity: {v.qnt}</Text>
              </View>

              <View style={styles.content}>
                <Text>Price: {v.unit_rate}</Text>
              </View>

              <View style={styles.content}>
                <Text>Total Amount: {v.total_amt}</Text>
              </View>

              <View style={styles.content}>
                <Text>Is Paid: {v.is_clear}</Text>
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
  empReducer: state.empReducer.reverse(),
  empProductReducer: state.empProductReducer.reverse(),
  itemStock: state.itemStock.reverse(),
  productReducer: state.productReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setEmpReducer: (stk) => dispatch(addEmpAction(stk)),
  setEmpProductReducer: (stk) => dispatch(addEmpProductAction(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEmpProduct);
