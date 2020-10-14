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
import {addProductAction} from '../../redux/action/productAction';
import MessageComponent from '../../components/MessageComponent';
import {Picker} from '@react-native-community/picker';

// MAIN FUNCTION ===============================================================
const AddProduct = ({setProductReducer}) => {
  // STATES
  const [date, setDate] = useState(new Date().toDateString());
  const [productName, setProductName] = useState('');
  const [model, setModel] = useState('');
  const [unit, setUnit] = useState('');
  const [itemSize, setItemSize] = useState('');
  const [cpRate, setCpRate] = useState('');
  const [spRate, setSpRate] = useState('');

  // DISPLAY DATA ON SCREEN
  const [renderProductList, setProductList] = useState([]);

  // SET SUCCESS MESSAGE
  // const [updateMsg, setUpdateMsg] = useState(false);

  // useEffect(() => {
  //   setUpdateMsg(false);
  // }, []);
  // ADD EMPLOYEES FUNC
  const onAddEmp = () => {
    if (!productName) {
      alert('Please fill name');
      return;
    }
    if (!model) {
      alert('Please fill model');
      return;
    }
    if (!itemSize) {
      alert('Please fill itemSize');
      return;
    }
    if (!cpRate) {
      alert('Please fill cpRate');
      return;
    }
    if (!spRate) {
      alert('Please fill spRate');
      return;
    }

    db.transaction(function (txn) {
      // INSERT ITEM INTO TABLE
      txn.executeSql(
        'INSERT INTO product_table (date, product_name, model, unit, item_size, cp_rate, sp_rate) values (?,?,?,?,?,?,?)',
        [date, productName, model, unit, itemSize, cpRate, spRate],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            setProductName('');
            setModel('');
            setUnit('');
            setItemSize('');
            setCpRate('');
            setSpRate('');

            alert('Product added successfully');

            // setUpdateMsg(true);

            // setTimeout(() => {
            //   setUpdateMsg(false);
            // }, 2000);
          } else {
            alert('Process Failed');
          }
        },
      );
    });

    setProductReducer({
      date: date,
      product_name: productName,
      model: model,
      unit: unit,
      item_size: itemSize,
      cp_rate: cpRate,
      sp_rate: spRate,
    });

    setProductList([
      {
        date: date,
        product_name: productName,
        model: model,
        unit: unit,
        item_size: itemSize,
        cp_rate: cpRate,
        sp_rate: spRate,
      },
      ...renderProductList,
    ]);
  };

  return (
    <SafeAreaView
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
      }}>
      <ChangeStatusBarColor
        backgroundColor={'#0097A7'}
        barStyle="light-content"
      />

      <ScrollView keyboardShouldPersistTaps="handled">
        {/* SUCCESS MESSAGE */}
        {/* {updateMsg ? <MessageComponent title="Product added to list" /> : null} */}

        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          {/* Date NAME */}
          <CustomInput
            placeholder="Date"
            title="Date"
            onChangeText={(n) => setDate(n.trim())}
            defaultValue={new Date().toDateString()}
            value={date}
          />

          {/* product NAME */}
          <CustomInput
            placeholder="Product Name"
            title="Product Name"
            onChangeText={(n) => setProductName(n.trim().toLowerCase())}
            value={productName}
          />
          {/*model*/}
          <CustomInput
            placeholder="Model"
            title="Model"
            onChangeText={(n) => setModel(n.trim().toLowerCase())}
            value={model}
          />
          {/*UNIT*/}
          {/* <CustomInput
            placeholder="Unit"
            title="Unit"
            onChangeText={(n) => setUnit(n.trim().toLowerCase())}
            value={unit}
          /> */}

          <View style={{borderBottomWidth: 1, minWidth: 110, height: 40}}>
            <Picker
              style={{color: 'blue'}}
              mode="dropdown"
              selectedValue={unit}
              onValueChange={(v) => setUnit(v)}>
              <Picker.Item label={'Unit'} value={null} />
              <Picker.Item label={'Pcs'} value={'Pcs'} />
              <Picker.Item label={'Mtr'} value={'Mtr'} />
              <Picker.Item label={'Kg'} value={'Kg'} />
              <Picker.Item label={'Ltr'} value={'Ltr'} />
              <Picker.Item label={'Than'} value={'Than'} />
              <Picker.Item label={'Fold'} value={'Fold'} />
              <Picker.Item label={'Pocket'} value={'Pocket'} />
            </Picker>
          </View>

          {/* SIZE PICKER*/}
          <View
            style={{
              borderColor: '#689F38',
              borderBottomWidth: 1,
            }}>
            <Picker
              selectedValue={itemSize}
              style={{
                // height: 50,
                minWidth: '45%',
                color: 'blue',
              }}
              onValueChange={(itemValue, itemIndex) => setItemSize(itemValue)}>
              <Picker.Item label="FREE-SIZE" value="FREE-SIZE" />
              <Picker.Item label="XXL" value="XXL" />
              <Picker.Item label="XL" value="XL" />
              <Picker.Item label="LARGE" value="LARGE" />
              <Picker.Item label="MEDIUM" value="MEDIUM" />
              <Picker.Item label="SMALL" value="SMALL" />
              <Picker.Item label="EXTRA-SMALL" value="EXTRA-SMALL" />
            </Picker>
          </View>

          {/* cpRate*/}
          <CustomInput
            placeholder="cpRate"
            title="cpRate"
            onChangeText={(n) => setCpRate(n)}
            value={cpRate}
            keyboardType="numeric"
            maxLength={7}
          />

          {/* spRate*/}
          <CustomInput
            placeholder="spRate"
            title="spRate"
            onChangeText={(n) => setSpRate(n)}
            value={spRate}
            keyboardType="numeric"
            maxLength={7}
          />
        </KeyboardAvoidingView>
        <CustomBtn title="Add" onBtnPress={onAddEmp} />
      </ScrollView>

      {/* FOR DISPLAY ADDED ITEMS ON SCREEN */}
      <View
        style={{
          backgroundColor: 'gray',
          marginVertical: 10,
          maxHeight: 250,
          width: '100%',
          // alignItems: 'flex-start',
        }}>
        <ScrollView>
          {renderProductList.map((v) => (
            <View
              key={nextId('proId')}
              style={{
                marginVertical: 5,
                backgroundColor: 'green',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <View style={styles.content}>
                <Text>Date: {v.date}</Text>
              </View>
              <View style={styles.content}>
                <Text>Product Name: {v.product_name}</Text>
              </View>
              <View style={styles.content}>
                <Text>Model: {v.model}</Text>
              </View>

              <View style={styles.content}>
                <Text>Size: {v.item_size}</Text>
              </View>

              <View style={styles.content}>
                <Text>CP Rate: {v.cp_rate}</Text>
              </View>

              <View style={styles.content}>
                <Text>SP Rate: {v.sp_rate}</Text>
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
  productReducer: state.productReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setProductReducer: (stk) => dispatch(addProductAction(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
