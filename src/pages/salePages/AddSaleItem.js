import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

// DATABASE
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'stockDatabase.db'});

import {connect} from 'react-redux';
import {addItem, resetItemState} from '../../redux/action/StockAction';
import {addSale, resetSaleState} from '../../redux/action/saleAction';
import ChangeStatusBarColor from '../../components/ChangeStatusBarColor';
import {
  SUB_HEADER_COLOR,
  DISABLED_COLOR,
  TXT_COLOR,
} from '../../colorsConst/colorConst';
import SwitchBetweenPickerAndInput from '../../components/SwitchBetweenPickerAndInput';
import DropdownPicker from '../../components/DropdownPicker';
import {Picker} from '@react-native-community/picker';
import {uniqueSizes, totalQnt} from '../../components/getDataFromStock';
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';

// MAIN FUNC======================================================
const AddSaleItem = ({
  stockReducer,
  saleReducer,
  setStock,
  resetStock,
  setSaleReducer,
  resetSaleReducer,
}) => {
  // USESTATE HOOKS
  const [date, setDate] = useState(new Date().toDateString());
  const [envNum, setEnvNum] = useState(
    `${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
  );
  const [customerName, setCustomerName] = useState('Other');
  const [customerAddress, setCustomerAddress] = useState('No Address');
  const [customerContact, setCustomerContact] = useState('No Contact');
  const [itemName, setItemName] = useState('');
  const [itemSize, setItemSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Pcs');
  const [salePrice, setSalePrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  // const [balance, setBalance] = useState('');

  let t_amount = salePrice * quantity - discount;
  let balance = t_amount - paidAmount;

  const [imgMime, setImgMime] = useState('image/jpg');

  // GET STOCK DATA
  // const [stkQuantity, setStkQuantity] = useState(0);
  // const [stkUnitRate, setStkUnitRate] = useState(0);
  // const [saleItemId, setSaleItemId] = useState(0);

  // // =--===-=----------------------------------------------------------

  let addSaleToDatabase = () => {
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
    // if (!itemSize) {
    //   alert('Please fill itemSize');
    //   return;
    // }

    // if (stkRemainItem < 0) {
    //   alert(
    //     `You have only (${stkQuantity} ${itemName}) in ID N. ${saleItemId}`,
    //   );
    //   return;
    // }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO sale_table (date, env_num, customer_name, customer_address, customer_contact, item_name, item_size, qnt, unit, sale_rate, discount, total_amt,  paid, balance) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          date,
          envNum,
          customerName,
          customerAddress,
          customerContact,
          itemName,
          itemSize,
          quantity,
          unit,
          salePrice,
          discount,
          t_amount,
          paidAmount,
          balance,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);

          if (results.rowsAffected > 0) {
            alert('Sale Added Successfully');
          } else alert('Process Failed');
        },
      );
    });

    setSaleReducer({
      date: date,
      env_num: envNum,
      customer_name: customerName,
      customer_address: customerAddress,
      customer_contact: customerContact,
      item_name: itemName,
      item_size: itemSize,
      qnt: quantity,
      unit: unit,
      sale_rate: salePrice,
      discount: discount,
      total_amt: t_amount,
      paid: paidAmount,
      balance: balance,
    });
  };
  //------------- end addSale ---------------------------------------------------------------

  // GENERATE INV
  const generateInv = () => {
    setEnvNum(
      `${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
    );
  };
  // ----------------------------------------------------------------------

  // COMPONENT FOR SOLD
  // const SaleDesc = () => {
  //   return stockReducer.map((item) =>
  //     item.item_name === itemName && itemSize === item.item_size ? (
  //       <TouchableOpacity
  //         style={{
  //           // backgroundColor: 'gray',
  //           // borderWidth: 2,
  //           margin: 5,
  //           alignItems: 'center',
  //         }}
  //         // onPress={() => {
  //         //   setSaleItemId(item.item_id);
  //         //   setStkQuantity(item.quantity);
  //         //   setStkUnitRate(item.unit_rate);
  //         // }}
  //         key={item.item_id}>
  //         <Image
  //           source={{
  //             uri: `data:${imgMime};base64,${item.img_data}`,
  //           }}
  //           style={{width: 80, height: 80, margin: 5}}
  //         />
  //         <Text>Pieces: {item.quantity}</Text>
  //       </TouchableOpacity>
  //     ) : null,
  //   );
  // };
  // ----------------------------------------------------------

  return (
    <SafeAreaView style={{flex: 1}}>
      <ChangeStatusBarColor
        barStyle="light-content"
        backgroundColor={SUB_HEADER_COLOR}
      />

      <View style={{flex: 1}}>
        <Text>saleReducer length{saleReducer.length}</Text>
        <Text>Balance: {balance}</Text>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{maxHeight: 180, backgroundColor: 'yellow', padding: 8}}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              // flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {/* INVOICE NO. */}
            <TouchableOpacity
              onPress={generateInv}
              style={{
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
              }}>
              <Text>INV N. </Text>
              <Text>{envNum}</Text>
            </TouchableOpacity>

            {/* CUSTOMER NAME */}
            <View>
              <SwitchBetweenPickerAndInput
                title="Customer Name"
                name="customer_name"
                selectedValue={customerName}
                onValueChange={(n) => setCustomerName(n)}
                dropdownList={saleReducer}
              />
            </View>

            {/* CUSTOMER ADDRESS */}
            <View>
              <SwitchBetweenPickerAndInput
                title="Customer Address"
                name="customer_address"
                selectedValue={customerAddress}
                onValueChange={(n) => setCustomerAddress(n)}
                dropdownList={saleReducer}
              />
            </View>

            {/* CUSTOMER Contact */}
            <View>
              <SwitchBetweenPickerAndInput
                title="Customer Contact"
                name="customer_contact"
                selectedValue={customerContact}
                onValueChange={(n) => setCustomerContact(n)}
                dropdownList={saleReducer}
              />
            </View>

            {/* QUANTITY BY ID*/}
            {/* <View
              style={{
                paddingLeft: 10,
                borderBottomWidth: 1,
                alignItems: 'center',
              }}>
              <Text style={{color: TXT_COLOR}}>qnt by ID</Text>
              <Text style={{color: 'green', fontWeight: 'bold'}}>
                {stkQuantity}
              </Text>
            </View> */}

            {/* ITEM NAME */}
            <View>
              <DropdownPicker
                title="Select Product"
                name="item_name"
                selectedValue={itemName}
                onValueChange={(n) => setItemName(n)}
                dropdownList={stockReducer}
              />
            </View>

            {/* SIZE PICKER */}
            <View style={{borderBottomWidth: 1, minWidth: 110, height: 40}}>
              <Picker
                selectedValue={itemSize}
                onValueChange={(v) => setItemSize(v)}>
                <Picker.Item label={'Size'} value={null} />
                {uniqueSizes(stockReducer, itemName).map((elm) => {
                  return <Picker.Item label={elm} value={elm} key={elm} />;
                })}
              </Picker>
            </View>

            {/* QUANTITY IN STOCK*/}
            <View
              style={{
                borderBottomWidth: 1,
                alignItems: 'center',
              }}>
              <Text style={{color: TXT_COLOR}}>qnt in Stock</Text>
              <Text style={{color: 'green', fontWeight: 'bold'}}>
                {totalQnt(stockReducer, itemName, itemSize)}
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
            />

            {/* Paid Amount */}
            <CustomInput
              style={{color: 'green'}}
              title="Paid Amount"
              placeholder="Paid Amount"
              onChangeText={(qnt) => setPaidAmount(qnt)}
              value={paidAmount}
              maxLength={10}
              keyboardType="numeric"
            />

            {/* ON CASH OR CREDIT*/}
            {/* <View style={{borderBottomWidth: 1, minWidth: 110}}>
              <Picker
                style={{padding: 0, margin: 0}}
                selectedValue={onCash}
                onValueChange={(v) => setOnCash(v)}>
                <Picker.Item label="Cash" value="Cash" />
                <Picker.Item label="Credit" value="Credit" />
              </Picker>
            </View> */}
          </KeyboardAvoidingView>
        </ScrollView>

        <CustomBtn
          title="Add Sale"
          onBtnPress={addSaleToDatabase}
          // style={{
          //   marginVertical: 10,
          // }}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  stockReducer: state.itemStock.reverse(),
  saleReducer: state.saleReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
  resetStock: () => dispatch(resetItemState()),

  setSaleReducer: (stk) => dispatch(addSale(stk)),
  resetSaleReducer: () => dispatch(resetSaleState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSaleItem);
