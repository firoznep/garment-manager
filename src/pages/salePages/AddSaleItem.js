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

import nextId from 'react-id-generator';

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
import {
  uniqueSizes,
  totalQnt,
  getModel,
} from '../../components/getDataFromStock';
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import {addProductAction} from '../../redux/action/productAction';

// MAIN FUNC======================================================
const AddSaleItem = ({
  stockReducer,
  saleReducer,
  setStock,
  resetStock,
  setSaleReducer,
  resetSaleReducer,

  customerReducer,

  productReducer,
  setProductReducer,
}) => {
  // USESTATE HOOKS
  const [date, setDate] = useState(new Date().toDateString());

  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
    new Date().getDay()
  ];
  const [envNum, setEnvNum] = useState(
    `${weekday}-${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
  );
  const [customerName, setCustomerName] = useState('Other');
  const [itemName, setItemName] = useState('');
  const [model, setModel] = useState('');
  const [itemSize, setItemSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Pcs');
  const [salePrice, setSalePrice] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);
  const [isClear, setIsClear] = useState('Pending');

  let t_amount = salePrice * quantity;
  let balance = t_amount - paidAmount;

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

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO sale_table (date, env_num, customer_name, item_name, model, item_size, qnt, unit, sale_rate, total_amt,is_clear) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [
          date,
          envNum,
          customerName,
          itemName,
          model,
          itemSize,
          quantity,
          unit,
          salePrice,
          t_amount,
          isClear,
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
      item_name: itemName,
      model: model,
      item_size: itemSize,
      qnt: quantity,
      unit: unit,
      sale_rate: salePrice,
      total_amt: t_amount,
      is_clear: isClear,
    });
  };
  //------------- end addSale ---------------------------------------------------------------

  // GENERATE INV
  const generateInv = () => {
    setEnvNum(
      `${weekday}-${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
    );
  };
  // ----------------------------------------------------------------------

  return (
    <SafeAreaView style={{flex: 1}}>
      <ChangeStatusBarColor
        barStyle="light-content"
        backgroundColor={SUB_HEADER_COLOR}
      />

      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>saleReducer length: {saleReducer.length}</Text>
          <Text>Balance: {balance}</Text>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{maxHeight: 190, backgroundColor: 'yellow', padding: 5}}>
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
              <Text style={{color: 'gray', fontSize: 10}}>INV N. </Text>
              <Text style={{fontSize: 12, color: 'blue'}}>{envNum}</Text>
            </TouchableOpacity>

            {/* CUSTOMER NAME */}
            <View>
              <SwitchBetweenPickerAndInput
                title="Customer Name"
                name="customer_name"
                selectedValue={customerName}
                onValueChange={(n) => setCustomerName(n)}
                dropdownList={customerReducer}
              />
            </View>

            {/* ITEM NAME */}
            <View>
              <DropdownPicker
                title="Select Product"
                name="product_name"
                selectedValue={itemName}
                onValueChange={(n) => setItemName(n)}
                dropdownList={productReducer}
              />
            </View>

            {/* SIZE PICKER */}
            <View style={{borderBottomWidth: 1, minWidth: 110, height: 40}}>
              <Picker
                style={{color: 'blue'}}
                mode="dropdown"
                selectedValue={itemSize}
                onValueChange={(v) => setItemSize(v)}>
                <Picker.Item label={'Size'} value={null} />
                {uniqueSizes(productReducer, itemName).map((elm) => {
                  return <Picker.Item label={elm} value={elm} key={elm} />;
                })}
              </Picker>
            </View>

            <View style={{borderBottomWidth: 1, minWidth: 140, height: 40}}>
              <Picker
                style={{color: 'blue'}}
                mode="dropdown"
                selectedValue={model}
                onValueChange={(v) => setModel(v)}>
                {/* <Picker.Item label={'Model'} value={null} /> */}
                {getModel(productReducer, itemName, itemSize).map((elm) => {
                  return <Picker.Item label={elm} value={elm} key={elm} />;
                })}
              </Picker>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              {/* MODEL */}
              {/* <CustomInput
                title="Model"
                placeholder="Model"
                onChangeText={(mod) => setModel(mod)}
                value={model}
              /> */}

              {/* Unit */}
              <CustomInput
                title="Unit"
                placeholder="Unit"
                onChangeText={(unt) => setUnit(unt)}
              />

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
            </View>
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

  customerReducer: state.customerReducer.reverse(),

  productReducer: state.productReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
  resetStock: () => dispatch(resetItemState()),

  setSaleReducer: (stk) => dispatch(addSale(stk)),
  resetSaleReducer: () => dispatch(resetSaleState()),

  setProductReducer: (stk) => dispatch(addProductAction(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSaleItem);
