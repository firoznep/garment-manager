import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'stockDatabase.db'});

import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';
import MessageComponent from '../../components/MessageComponent';

const UpdateStock = ({navigation}) => {
  let [itemId, setItemId] = useState('');
  // let [date, setDate] = useState(new Date().toDateString());
  let [itemName, setItemName] = useState('');
  // let [itemColor, setItemColor] = useState('color not specify');
  let [itemSize, setItemSize] = useState('free size');
  let [unit, setUnit] = useState('pcs');
  let [unitRate, setUnitRate] = useState('');
  let [quantity, setQuantity] = useState('');
  let [description, setDescription] = useState('no description!');

  let tAmount = unitRate * quantity;

  let [updateMsg, setUpdateMsg] = useState(false);

  let updateAllStates = (name, size, unit, rate, qnt, description) => {
    setItemName(name);
    // setItemColor(color);
    setItemSize(size);
    setUnit(unit);
    setUnitRate(rate);
    setQuantity(qnt);
    setDescription(description);
  };

  let searchItem = () => {
    // console.log(itemId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM stock_table where item_id = ?',
        [itemId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.item_name,
              res.item_size,
              res.unit,
              res.unit_rate,
              res.quantity,
              res.description,
            );
          } else {
            alert('No item found');
            updateAllStates('', '', '', '', '', '', '');
          }
        },
      );
    });
  };

  let updateStock = () => {
    if (!itemId) {
      alert('Please fill item id');
      return;
    }
    if (!itemName) {
      alert('Please fill name');
      return;
    }
    if (!quantity) {
      alert('Please fill quantity');
      return;
    }
    if (!unitRate) {
      alert('Please fill rate');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE stock_table set item_name=?, item_size=?,quantity=?, unit=?, unit_rate=?, total_amount=? , description=? where item_id=?',
        [
          itemName,
          itemSize,
          quantity,
          unit,
          unitRate,
          tAmount,
          description,
          itemId,
        ],

        (tx, results) => {
          // console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            updateAllStates('', '', '', '', '', '', '');
            Alert.alert(
              'Success',
              'item Updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    setUpdateMsg(true);
                    setTimeout(() => {
                      setUpdateMsg(false);
                    }, 2000);
                  },
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, margin: 15}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between', padding: 20}}>
              {/* ID FIELD */}
              <CustomInput
                title="Item Id"
                placeholder="Enter item Id"
                style={{padding: 10}}
                onChangeText={(itemId) => setItemId(itemId)}
              />
              <CustomBtn title="Search item" onBtnPress={searchItem} />

              {/* upadate field */}
              <CustomInput
                title="Item Name"
                placeholder="Enter Name"
                value={itemName}
                style={{padding: 10}}
                onChangeText={(itemName) => setItemName(itemName)}
              />

              {/* <CustomInput
                title="Color"
                placeholder="color"
                value={itemColor}
                style={{padding: 10}}
                onChangeText={(clr) => setItemColor(clr)}
              /> */}

              <CustomInput
                title="Size"
                placeholder="size"
                value={itemSize}
                style={{padding: 10}}
                onChangeText={(sz) => setItemSize(sz)}
              />

              <CustomInput
                title="Unit"
                placeholder="unit"
                value={unit}
                style={{padding: 10}}
                onChangeText={(u) => setUnit(u)}
              />

              <CustomInput
                title="Price Per Unit"
                placeholder="unit rate"
                value={'' + unitRate}
                style={{padding: 10}}
                onChangeText={(ur) => setUnitRate(ur)}
                keyboardType="numeric"
              />

              <CustomInput
                title="Quantity"
                placeholder="quantity"
                value={'' + quantity}
                onChangeText={(quantity) => setQuantity(quantity)}
                maxLength={10}
                style={{padding: 10}}
                keyboardType="numeric"
              />

              <CustomInput
                title="Description"
                value={description}
                placeholder="description"
                onChangeText={(description) => setDescription(description)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />

              {updateMsg ? (
                <MessageComponent title="Item Updated Successfully" />
              ) : null}

              <CustomBtn title="Update item" onBtnPress={updateStock} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateStock;
