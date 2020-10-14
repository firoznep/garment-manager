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

// MAIN FUNC==============================---------------------------------------------------
const EmployeesDetail = ({
  navigation,
  empReducer,
  empProductReducer,
  empPayReducer,
  setEmpPayReducer,
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const [date, setDate] = useState(new Date().toDateString());
  const [eName, setEName] = useState('');
  const [pay, setPay] = useState('');
  const [des, setDes] = useState('');

  // const [toBePaid, setToBePaid] = useState('');
  let toBePaid = 0;

  const EmpProductListViewComponent = (item) => {
    return (
      <SafeAreaView>
        <Text style={{color: '#00796B', paddingTop: 10, fontSize: 24}}>
          {item.hire_date}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowDetail(true);
            setEName(item.emp_name);
          }}
          key={item.employee_id}
          style={{
            padding: 10,
            backgroundColor: '#fff',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Employee Name</Text>
            <Text style={styles.resultTxt}>{item.emp_name}</Text>
          </View>
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Job Title</Text>
            <Text style={styles.resultTxt}>{item.job_title}</Text>
          </View>
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Address</Text>
            <Text style={styles.resultTxt}>{item.emp_address}</Text>
          </View>
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Contact</Text>
            <Text style={styles.resultTxt}>{item.emp_contact}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  // GET TOTAL PIECES AND AMOUNT
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const GetTotal = () => {
    let gt = [];
    // let p = [];
    empProductReducer.map((v) => {
      if (v.emp_name === eName && v.is_clear === 'Pending') {
        gt.push(Number(v.total_amt));
        // p.push(Number(v.qnt));
      }
    });

    let gtp = [];
    // let p = [];
    empPayReducer.map((v) => {
      if (v.emp_name === eName && v.is_clear === 'Pending') {
        gtp.push(Number(v.amount));
        // p.push(Number(v.qnt));
      }
    });

    toBePaid = gt.reduce(reducer, 0) - gtp.reduce(reducer, 0);

    return (
      <View style={styles.rowFlexcontaier}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 10}}>Total balance of - {eName}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'red'}}>
            {gt.reduce(reducer, 0)}
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 10}}>Total paid amount of - {eName}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'red'}}>
            {gtp.reduce(reducer, 0)}
          </Text>
        </View>

        <View>
          <Text>Balance: {toBePaid}</Text>
        </View>
      </View>
    );
  };

  // ADD EMPLOYEES FUNC
  const onEmpPay = () => {
    if (!eName) {
      alert('Please fill name');
      return;
    }
    if (!pay) {
      alert('Please fill payment');
      return;
    }
    if (!des) {
      alert('Please fill description');
      return;
    }
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
          'INSERT INTO employee_payment_table (date, emp_name, amount, description, is_clear) values (?,?,?,?,?)',
          [date, eName, pay, des, 'Pending'],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              setEName('');
              setPay('');
              setDes('');

              alert('Paid success');
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
          'INSERT INTO employee_payment_table (date, emp_name, amount, description, is_clear) values (?,?,?,?,?)',
          [date, eName, pay, des, 'Clear'],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              setEName('');
              setPay('');
              setDes('');

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

      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE employee_payment_table set is_clear=? where emp_name = ?',
          ['Clear', eName],

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
          'UPDATE emp_product_ready_table set is_clear=? where emp_name = ?',
          ['Paid', eName],

          (tx, results) => {
            // console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              setEName('');
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
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          // backgroundColor: BG_COLOR,
        }}>
        <View style={styles.selfView}>
          <Text style={{color: TITLE_COLOR}}>
            Total Employee: {empReducer.length}
          </Text>
        </View>

        {/* EMP LIST */}
        <View style={{flex: 1}}>
          <FlatList
            data={empReducer}
            initialNumToRender={7}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={5}
            onEndReachedThreshold={0.01}
            removeClippedSubviews={true}
            renderItem={({item}) => EmpProductListViewComponent(item)}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          />
        </View>

        {/* ADD BTN */}
        <TouchableOpacity
          onPress={() => navigation.navigate('AddEmployees')}
          style={styles.addButtonContainer}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {showDetail ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(21,23,55,.5)',
              padding: 40,
            }}>
            <ScrollView style={{backgroundColor: 'yellow', padding: 10}}>
              <TouchableOpacity
                onPress={() => setShowDetail(false)}
                style={{
                  // padding: 20,
                  backgroundColor: 'red',
                  width: 40,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>X</Text>
              </TouchableOpacity>
              <View>
                <Text style={{color: 'orange'}}>Payment to</Text>
                <Text>{eName}</Text>
              </View>

              {/* Date */}
              <CustomInput
                title="Date"
                placeholder="Date"
                onChangeText={(qnt) => setDate(qnt)}
                // maxLength={7}
                // keyboardType="numeric"
                value={date}
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
              <GetTotal />
              {/* <GetTotalPay /> */}
            </ScrollView>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

// STYLE
const styles = StyleSheet.create({
  addButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 50,
    right: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    borderRadius: 30,

    elevation: 15,
  },
  addButtonText: {fontSize: 24, color: 'yellow'},
  rowFlexcontaier: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: DISABLED_COLOR,
    paddingBottom: 5,
    paddingTop: 5,
  },
  resultTxt: {color: TXT_COLOR, fontWeight: 'bold', fontSize: 20},
});

const mapStateToProps = (state) => ({
  empReducer: state.empReducer.reverse(),
  empPayReducer: state.empPayReducer.reverse(),
  empProductReducer: state.empProductReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setEmpPayReducer: (stk) => dispatch(addEmpPayAction(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesDetail);
