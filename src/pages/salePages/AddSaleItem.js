import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  Image,
} from 'react-native';

import SwitchBetweenPickerAndInput from '../../components/SwitchBetweenPickerAndInput';
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import MessageComponent from '../../components/MessageComponent';

import {connect} from 'react-redux';
import {Picker} from '@react-native-community/picker';

import {openDatabase} from 'react-native-sqlite-storage';
import DropdownPicker from '../../components/DropdownPicker';
var db = openDatabase({name: 'stockDatabase.db'});

const AddSaleItem = ({stock, saleReducer, navigation}) => {
  const [customerName, setCustomerName] = useState('Other');
  const [date, setDate] = useState(new Date().toDateString());
  const [envNum, setEnvNum] = useState(1);
  const [itemName, setItemName] = useState('');
  const [itemSize, setItemSize] = useState('');
  let [quantity, setQuantity] = useState('');
  let [unit, setUnit] = useState('');
  let [salePrice, setSalePrice] = useState('');
  let [discount, setDiscount] = useState('');
  let [onCash, setOnCash] = useState('Cash');

  const [saleItemId, setSaleItemId] = useState(0);
  const [stkQuantity, setStkQuantity] = useState(0);
  const [stkUnitRate, setStkUnitRate] = useState(0);

  let [imgMime, setImgMime] = useState('image/jpg');

  let stkRemainItem = stkQuantity - quantity;
  let stkTAmt = stkRemainItem * stkUnitRate;

  let t_amount = salePrice * quantity - discount;

  let [updateMsg, setUpdateMsg] = useState(false);

  const incrementEnv = () => {
    setEnvNum(lst_elm);
  };
  const uniqueSizes = () => {
    let arr = stock.map((i) => (i.item_name === itemName ? i.item_size : null));
    let filtered = arr.filter((i) => i != null);
    let unArr = [...new Set(filtered)];
    return unArr;
  };

  // FOR TOTAL ITEM QUANTITY
  const totalQun = () => {
    let arr = stock.map((i) =>
      i.item_name === itemName && i.item_size === itemSize ? i.quantity : null,
    );
    let filtered = arr.filter((i) => i != null);
    let setArr = [...new Set(filtered)];
    const total = (total, num) => total + num;
    return setArr.reduce(total, 0);
  };

  // COMPONENT FOR SOLD
  const SaleDesc = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        {stock.map((item) =>
          item.item_name === itemName && itemSize === item.item_size ? (
            <TouchableOpacity
              onPress={() => {
                setSaleItemId(item.item_id);
                setStkQuantity(item.quantity);
                setStkUnitRate(item.unit_rate);
              }}
              key={item.item_id}>
              <Image
                source={{
                  uri: `data:${imgMime};base64,${item.img_data}`,
                }}
                style={{width: 80, height: 80, margin: 5}}
              />
            </TouchableOpacity>
          ) : null,
        )}
      </View>
    );
  };

  const generateInv = () => {
    setEnvNum(envNum + 1);
  };

  let addSale = () => {
    if (envNum === 0) {
      alert('Please fill envNum');
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
    if (!salePrice) {
      alert('Please fill salePrice');
      return;
    }
    if (!itemSize) {
      alert('Please fill itemSize');
      return;
    }
    if (stkRemainItem < 0) {
      alert(
        `You have only (${stkQuantity} ${itemName}) in ID N. ${saleItemId}`,
      );
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO sale_table (date,env_num, customer_name,item_name,item_size, qnt, unit, sale_rate, discount, total_amt,  on_cash) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [
          date,
          envNum,
          customerName,
          itemName,
          itemSize,
          quantity,
          unit,
          salePrice,
          discount,
          t_amount,
          onCash,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);

          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
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
          } else alert('Registration Failed');
        },
      );
    });

    // UPDATE STOCK ITEM
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE stock_table set quantity=?, total_amount=? where item_id=?',
        [stkRemainItem, stkTAmt, saleItemId],
      );
    });

    // DELETE STOCK ITEM
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM stock_table where quantity=0', []);
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, marginHorizontal: 20, marginTop: 20}}>
        <ScrollView>
          <SaleDesc />
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'gray'}}>INV N0: </Text>
          <Text>{envNum}</Text>
          <Text style={{color: 'gray'}}> price: </Text>
          <Text>{salePrice}</Text>
          <Text style={{color: 'gray'}}> * qnt: </Text>
          <Text>{quantity}</Text>
          <Text style={{color: 'gray'}}> = Total: </Text>
          <Text>{quantity * salePrice - discount}</Text>
          <Text> customer name = {customerName}</Text>

          <Text> -saleItemId = {saleItemId}</Text>
          <Text> -stkQuantity = {stkQuantity}</Text>
          <Text> -stkUnitRate = {stkUnitRate}</Text>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'space-between', padding: 20}}>
            {/* get item pic */}

            {/* INVOICE NO. */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
              }}>
              <Text onPress={generateInv}>INVOICE NO. = </Text>
              <Text
                style={{
                  borderWidth: 1,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderBottomWidth: 0,
                }}>
                {envNum}
              </Text>
            </View>

            {/* CUSTOMER NAME */}
            {/* <CustomInput
              title="Customer Name"
              placeholder="Customer Name"
              onChangeText={(n) => setCustomerName(n)}
            /> */}

            <Text>Customer name</Text>
            <SwitchBetweenPickerAndInput
              name="customer_name"
              selectedValue={customerName}
              onValueChange={(n) => setCustomerName(n)}
              dropdownList={saleReducer}
            />

            {/* <SwitchBetweenPickerAndInput
              name="item_name"
              selectedValue={itemName}
              onValueChange={(n) => setItemName(n)}
              dropdownList={stock}
            /> */}

            <DropdownPicker
              name="item_name"
              selectedValue={itemName}
              onValueChange={(n) => setItemName(n)}
              dropdownList={stock}
            />

            {/* unit 
            <CustomInput
              title="unit"
              placeholder="unit"
              onChangeText={(n) => setUnit(n)}
            /> */}

            {/* UNIT PICKER */}
            <View
              style={{
                // marginHorizontal: 15,
                marginTop: 10,
                borderColor: '#689F38',
                borderBottomWidth: 1,
              }}>
              <Picker
                selectedValue={unit}
                style={{
                  height: 50,
                  // width: 150,
                }}
                onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}>
                <Picker.Item label="Pcs" value="Pcs" />
                <Picker.Item label="Metre" value="Metre" />
                <Picker.Item label="Kg" value="Kg" />
                <Picker.Item label="L (litre)" value="L (litre)" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            {/* SIZE PICKER */}
            <View style={{borderBottomWidth: 1}}>
              <Picker
                selectedValue={itemSize}
                onValueChange={(v) => setItemSize(v)}>
                <Picker.Item label={'Select Size'} value={null} />
                {uniqueSizes().map((elm) => {
                  return <Picker.Item label={elm} value={elm} key={elm} />;
                })}
              </Picker>
            </View>

            {/* TOTAL QUANTITY */}
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>Avalable qnt in Stock=</Text>
              <Text style={{fontSize: 16, color: 'green', fontWeight: 'bold'}}>
                {totalQun()}
              </Text>
            </View>

            {/* Sale price */}
            <CustomInput
              title="Sale Price"
              placeholder="Sale Price"
              onChangeText={(price) => setSalePrice(price)}
              // value={salePrice}
              keyboardType="numeric"
            />

            {/* quantity */}
            <CustomInput
              title="Quantity"
              placeholder="Quantity"
              onChangeText={(qnt) => setQuantity(qnt)}
              // value={quantity}
              maxLength={10}
              keyboardType="numeric"
            />

            {/* Discount */}
            <CustomInput
              title="Discount"
              placeholder="Discount"
              onChangeText={(qnt) => setDiscount(qnt)}
              value={discount}
              maxLength={10}
              keyboardType="numeric"
              style={{padding: 10}}
            />

            {/* ON CASH OR CREDIT*/}
            <View style={{borderBottomWidth: 1}}>
              <Picker
                selectedValue={onCash}
                onValueChange={(v) => setOnCash(v)}>
                <Picker.Item label="Cash" value="Cash" />
                <Picker.Item label="Credit" value="Credit" />
              </Picker>
            </View>

            {updateMsg ? <MessageComponent title="Item added to list" /> : null}

            <CustomBtn
              title="Add Sale"
              onBtnPress={addSale}
              style={{
                marginVertical: 10,
              }}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  stock: state.itemStock.reverse(),
  saleReducer: state.saleReducer.reverse(),
});

export default connect(mapStateToProps)(AddSaleItem);
