import React, {useState} from 'react';
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
import {
  addEmpAction,
  addEmpProductAction,
} from '../../redux/action/employeeAction';
import DropdownPicker from '../../components/DropdownPicker';
import MessageComponent from '../../components/MessageComponent';

// MAIN FUNCTION ===============================================================
const AddEmpProduct = ({
  itemStock,
  empReducer,
  setEmpReducer,
  empProductReducer,
  setEmpProductReducer,
}) => {
  // STATES
  const [date, setDate] = useState(new Date().toDateString());
  const [empName, setEmpName] = useState('');
  const [productName, setProductName] = useState('');
  const [qnt, setQnt] = useState('');
  const [unitRate, setUnitRate] = useState('');
  const [isPaid, setIsPaid] = useState('Pending...');

  let totalAmt = qnt * unitRate;

  // DISPLAY DATA ON SCREEN
  const [renderEmpProductList, setEmpProductList] = useState([]);

  // SET SUCCESS MESSAGE
  const [updateMsg, setUpdateMsg] = useState(false);

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
            setEmpName('');
            setProductName('');
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
      date: date,
      emp_name: empName,
      product_name: productName,
      qnt: qnt,
      unit_rate: unitRate,
      total_amt: totalAmt,
      is_clear: isPaid,
    });

    setEmpProductList([
      ...renderEmpProductList,
      {
        date: date,
        emp_name: empName,
        product_name: productName,
        qnt: qnt,
        unit_rate: unitRate,
        total_amt: totalAmt,
        is_clear: isPaid,
      },
    ]);
  };

  return (
    <SafeAreaView>
      <ChangeStatusBarColor
        backgroundColor={'orange'}
        barStyle="dark-content"
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
          {/* EMPLOYEE NAME */}
          <DropdownPicker
            title="Select Employee Name"
            name="emp_name"
            selectedValue={empName}
            onValueChange={(n) => setEmpName(n)}
            dropdownList={empReducer}
          />

          {/* PRODUCT NAME */}
          <DropdownPicker
            title="Select Product Name"
            name="item_name"
            selectedValue={productName}
            onValueChange={(n) => setProductName(n)}
            dropdownList={itemStock}
          />

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
          <CustomInput
            title="Is paid"
            placeholder="Is paid"
            onChangeText={(p) => setIsPaid(p)}
            value={isPaid}
          />
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
              key={`${v.employee_id}-${v.emp_name}`}
              style={{
                marginVertical: 5,
                backgroundColor: 'green',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              <View style={styles.content}>
                <Text>Hire Date: {v.hire_date}</Text>
              </View>
              <View style={styles.content}>
                <Text>Employee Name: {v.emp_name}</Text>
              </View>
              <View style={styles.content}>
                <Text>Job Title: {v.job_title}</Text>
              </View>

              <View style={styles.content}>
                <Text>Address: {v.emp_address}</Text>
              </View>

              <View style={styles.content}>
                <Text>Contact: {v.emp_contact}</Text>
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
});

const mapDispatchToProps = (dispatch) => ({
  setEmpReducer: (stk) => dispatch(addEmpAction(stk)),
  setEmpProductReducer: (stk) => dispatch(addEmpProductAction(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEmpProduct);
