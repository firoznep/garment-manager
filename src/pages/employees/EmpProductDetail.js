import {Picker} from '@react-native-community/picker';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';

// database
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'stockDatabase.db'});

import {
  BG_COLOR,
  BTN_COLOR,
  BTN_COLOR_TWO,
  DISABLED_COLOR,
  TITLE_COLOR,
} from '../../colorsConst/colorConst';
import ChangeStatusBarColor from '../../components/ChangeStatusBarColor';
import CustomBtn from '../../components/CustomBtn';
import MessageComponent from '../../components/MessageComponent';
import {addEmpProductAction} from '../../redux/action/employeeAction';

// MAIN FUNC ===================------------------------------=============================================
const EmployeesProductDetail = ({navigation, empProductReducer}) => {
  // STATES

  const [listData, setListData] = useState(
    empProductReducer.filter(
      (d) => d.date === new Date().toDateString() && d.is_clear === 'Pending',
    ),
  );
  const [shorting, setShorting] = useState('emp_name');
  const [filterBy, setFilterBy] = useState(new Date().toDateString());

  const [shortingTwo, setShortingTwo] = useState('Product_name');
  const [filterByTwo, setFilterByTwo] = useState(new Date().toDateString());

  // const [productName, setProductName] = useState('');

  let [updateMsg, setUpdateMsg] = useState(false);

  let itemId = 0;

  useEffect(() => {
    setUpdateMsg(false);
  }, []);
  // DELETE PRODUCT BY ID
  let deleteProductById = (item) => {
    itemId = item.emp_product_id;

    if (itemId === item.emp_product_id) {
      Alert.alert(
        'Warning',
        `Are you sure want to Product: ${item.product_name}`,
        [
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
          },
          {
            text: 'Ok',
            onPress: () => getDbId(),
          },
        ],

        {cancelable: false},
      );
    }
  };

  const getDbId = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  emp_product_ready_table where emp_product_id=?',
        [itemId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Item deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    let data = listData.filter(
                      (i) => i.emp_product_id !== itemId,
                    );
                    setListData(data);
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid Item-id');
          }
        },
      );
    });
  };

  const EmpProductListViewComponent = ({item}) => {
    return (
      <SafeAreaView>
        <View
          key={item.emp_product_id}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: '#fff',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={{color: 'brown', fontSize: 18}}>{item.date}</Text>

            <View
              style={{
                flexDirection: 'row',
                minWidth: 90,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: '#000',
                  backgroundColor: 'orange',
                  fontSize: 20,
                  borderRadius: 10,
                }}>
                &#9998;
              </Text>

              {/* delete button */}
              <Text
                onPress={() => deleteProductById(item)}
                style={{
                  paddingHorizontal: 10,
                  color: '#fff',
                  backgroundColor: 'red',
                  fontSize: 20,
                  borderRadius: 10,
                }}>
                &#10007;
              </Text>
            </View>
          </View>

          {/* <View style={styles.selfView}>
          <Text style={{color: TITLE_COLOR}}>Employee id</Text>
          <Text style={styles.resultTxt}>{item.emp_product_id}</Text>
        </View> */}
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Employee Name</Text>
            <Text style={styles.resultTxt}>{item.emp_name}</Text>
          </View>

          {/* PRODUCT NAME*/}
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Product name</Text>
            <Text style={styles.resultTxt}>
              {item.product_name}
              {item.unit}
            </Text>
          </View>

          {/* ITEM QUANTITY */}
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Quantity</Text>
            <Text style={styles.resultTxt}>
              {item.qnt}
              Pcs
            </Text>
          </View>

          {/* ITEM unit rate */}
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Piece Rate</Text>
            <Text style={styles.resultTxt}>{item.unit_rate}</Text>
          </View>

          {/* TOTAL AMOUNT*/}
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Total Amount</Text>
            <Text style={styles.resultTxt}>{item.total_amt}</Text>
          </View>

          {/* IS PAID*/}
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Is paid</Text>
            <Text style={styles.resultTxt}>{item.is_clear}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  // FILTER BY FUNC
  let onFilter = () => {
    let dt = empProductReducer.filter(
      (v) =>
        (v.emp_name === filterBy && v.is_clear === 'Pending') ||
        (v.product_name === filterBy && v.is_clear === 'Pending') ||
        (v.date === filterBy && v.is_clear === 'Pending'),
    );

    setListData(dt);

    setUpdateMsg(true);
    setTimeout(() => {
      setUpdateMsg(false);
    }, 2000);
  };

  // FILTER BY FUNC
  let onFilterProName = () => {
    let dt = empProductReducer.filter(
      (v) =>
        (v.date === filterByTwo &&
          v.emp_name === filterBy &&
          v.is_clear === 'Pending') ||
        (v.date === filterByTwo &&
          v.product_name === filterBy &&
          v.is_clear === 'Pending') ||
        (v.product_name === filterByTwo &&
          v.emp_name === filterBy &&
          v.is_clear === 'Pending'),
    );

    setListData(dt);

    setUpdateMsg(true);
    setTimeout(() => {
      setUpdateMsg(false);
    }, 2000);
  };

  // SHORT BY NAME OR DATE FUNC
  let nameArr = empProductReducer.map((val) => {
    switch (shorting) {
      case 'product_name':
        return val.product_name;
      case 'emp_name':
        return val.emp_name;
      case 'date':
        return val.date;

      default:
        return 'No Data';
    }
  });
  let arrSet = new Set(nameArr);
  let uniqueArr = [...arrSet];

  // let nDt = empProductReducer.map((val) => val.date);
  // let nSet = new Set(nDt);
  // let nUnique = [...nSet];

  // SHORT BY NAME OR DATE FUNC
  let nameArrTwo = empProductReducer.map((val) => {
    switch (shortingTwo) {
      case 'product_name':
        return val.product_name;

      case 'date':
        return val.date;

      default:
        return 'No Data';
    }
  });

  let arrSetTwo = new Set(nameArrTwo);
  let uniqueArrTwo = [...arrSetTwo];

  // GET TOTAL PIECES AND AMOUNT
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // GET TOTAL BY PRO NAME AND EMP NAME
  const GetTotalByProAndName = () => {
    let d = [];
    let p = [];
    empProductReducer.map((v) => {
      if (
        (v.emp_name === filterBy &&
          v.date === filterByTwo &&
          v.is_clear === 'Pending') ||
        (v.product_name === filterBy &&
          v.date === filterByTwo &&
          v.is_clear === 'Pending') ||
        (v.emp_name === filterBy &&
          v.product_name === filterByTwo &&
          v.is_clear === 'Pending')
      ) {
        // setListData(dt);
        d.push(v.total_amt);
        p.push(Number(v.qnt));
      }
    });

    return (
      <View style={styles.rowFlexcontaier}>
        <View style={{borderBottomWidth: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 10}}>
            T.P. of - {filterBy} by {filterByTwo}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
            {p.reduce(reducer, 0)}
          </Text>
        </View>
        <View style={{borderBottomWidth: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 10}}>
            T.A. of - {filterBy} by {filterByTwo}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
            {d.reduce(reducer, 0)}
          </Text>
        </View>
      </View>
    );
  };

  const GetTotal = () => {
    let d = [];
    let p = [];
    empProductReducer.map((v) => {
      if (
        (v.emp_name === filterBy && v.is_clear === 'Pending') ||
        (v.date === filterBy && v.is_clear === 'Pending') ||
        (v.product_name === filterBy && v.is_clear === 'Pending')
      ) {
        d.push(v.total_amt);
        p.push(Number(v.qnt));
      }
    });
    return (
      <View style={styles.rowFlexcontaier}>
        <View style={{borderBottomWidth: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 10}}>T.P. of - {filterBy}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
            {p.reduce(reducer, 0)}
          </Text>
        </View>
        <View style={{borderBottomWidth: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 10}}>T.A. of {filterBy}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
            {d.reduce(reducer, 0)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ChangeStatusBarColor
        barStyle="dark-content"
        backgroundColor={'#F57C00'}
      />
      <View
        style={{
          // flex: 1,
          backgroundColor: 'orange',
        }}>
        {/* FILTER BY NAME */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
            // backgroundColor: 'red',
          }}>
          {/* EMPLOYEES NAME */}
          <Picker
            style={{color: 'white', width: 170, padding: 0, margin: 0}}
            selectedValue={shorting}
            onValueChange={(v) => setShorting(v)}>
            <Picker.Item label="emp_name" value="emp_name" />
            <Picker.Item label="product_name" value="product_name" />
            <Picker.Item label="date" value="date" />
          </Picker>

          <Picker
            style={{color: 'white', width: 170, padding: 0, margin: 0}}
            selectedValue={filterBy}
            onValueChange={(v) => setFilterBy(v)}>
            <Picker.Item label="Filter by" value="" />
            {uniqueArr.map((elm) => {
              return <Picker.Item label={elm} value={elm} key={elm} />;
            })}
          </Picker>

          <TouchableOpacity
            onPress={onFilter}
            style={{
              backgroundColor: BTN_COLOR,
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              paddingHorizontal: 10,
              borderRadius: 10,
              width: '100%',
            }}>
            <Text
              style={{
                color: '#fff',
              }}>
              by Name
            </Text>
          </TouchableOpacity>
        </View>

        {/* GET TOTAL BY EMP NAME AND PRODUCT NAME */}
        <View style={styles.rowFlexcontaier}>
          {/* EMPLOYEES NAME */}
          <Picker
            style={{color: 'white', width: 170, padding: 0, margin: 0}}
            selectedValue={shortingTwo}
            onValueChange={(v) => setShortingTwo(v)}>
            <Picker.Item label="product_name" value="product_name" />
            <Picker.Item label="date" value="date" />
          </Picker>

          <Picker
            style={{color: 'white', width: 180}}
            selectedValue={filterByTwo}
            onValueChange={(v) => setFilterByTwo(v)}>
            <Picker.Item label="Filter by" value="" />
            {uniqueArrTwo.map((elm) => {
              return <Picker.Item label={elm} value={elm} key={elm} />;
            })}
          </Picker>

          <TouchableOpacity
            onPress={onFilterProName}
            style={{
              backgroundColor: BTN_COLOR,
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              paddingHorizontal: 10,
              borderRadius: 10,
              width: '100%',
            }}>
            <Text
              style={{
                color: '#fff',
                // backgroundColor: BTN_COLOR,
                // padding: 10,
              }}>
              By Name and Date
            </Text>
          </TouchableOpacity>
        </View>

        {/* GET TOTAL COMPONENT */}
        <GetTotal />

        <GetTotalByProAndName />

        {/* EMP LIST */}
        {/* <View style={{flex: 1}}> */}

        {/* </View> */}
        {/* ADD BTN */}

        {updateMsg ? <MessageComponent title="Data Refreshed" /> : null}
      </View>

      <FlatList
        data={listData}
        keyExtractor={(item, index) => item.emp_product_id.toString()}
        initialNumToRender={5}
        onEndReachedThreshold={0.01}
        removeClippedSubviews={true}
        renderItem={({item}) => <EmpProductListViewComponent item={item} />}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddEmpProduct')}
        style={styles.addButtonContainer}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
    right: 80,
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
    padding: 5,
  },
});

const mapStateToProps = (state) => ({
  empProductReducer: state.empProductReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setEmpProductReducer: (stk) => dispatch(addEmpProductAction(stk)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeesProductDetail);
