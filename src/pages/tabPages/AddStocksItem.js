import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import ImagePicker from 'react-native-image-crop-picker';

import {connect} from 'react-redux';

import nextId from 'react-id-generator';

// FOR DATABASE SQLITE
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'stockDatabase.db'});

// COMPONENTS
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';

import {DEFAULT_CROPED_IMG} from '../../data/imgCropedData';
import {SUB_HEADER_COLOR} from '../../colorsConst/colorConst';
import ChangeStatusBarColor from '../../components/ChangeStatusBarColor';
import {addItem} from '../../redux/action/StockAction';
import MessageComponent from '../../components/MessageComponent';
import SwitchBetweenPickerAndInput from '../../components/SwitchBetweenPickerAndInput';

// MAIN FUNCTION ==========================================================================
const AddStocksItem = ({navigation, itemStock, setStock}) => {
  // STOCK DATA INPUTS
  const [date, setDate] = useState(new Date().toDateString());
  // const [invNum, setInvNum] = useState(
  //   `${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
  // );
  const [itemName, setItemName] = useState('');
  const [itemSize, setItemSize] = useState('FREE-SIZE');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('pcs');
  const [unitRate, setUnitRate] = useState('');
  const [extra, setExtra] = useState('');
  const [renderStock, setRenderStock] = useState([]);

  let t_amount = quantity * unitRate + Number(extra);

  // image selector
  const [imgMime, setImgMime] = useState('image/jpg');
  const [imgData, setImgData] = useState(DEFAULT_CROPED_IMG);

  const [updateMsg, setUpdateMsg] = useState(false);

  // SET IMAGE WIDTH AND HEIGHT
  const [imgSizeToggle, setImgSizeToggle] = useState(false);
  const [imgWidth, setImgWidth] = useState(120);
  const [imgHeight, setImgHeight] = useState(100);

  // GET IMAGE FROM GALLERY
  const imgFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        setImgData(image.data);
      })
      .catch((err) => {
        alert('Canceled by user', err);
      });
  };

  // GET IMAGE FROM CAMERA
  const imgFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        setImgData(image.data);
      })
      .catch((err) => {
        alert('Canceled by user', err);
      });
  };

  let add_stock = () => {
    if (!itemName) {
      alert('Please fill name');
      return;
    }
    if (!quantity) {
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
        'INSERT INTO stock_table (date, img_data, item_name, item_size, quantity, unit, unit_rate, ext, total_amount) values (?,?,?,?,?,?,?,?,?)',
        [
          date,
          imgData,
          itemName,
          itemSize,
          quantity,
          unit,
          unitRate,
          extra,
          t_amount,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            setUpdateMsg(true);
            setTimeout(() => {
              setUpdateMsg(false);
            }, 2000);

            setUnitRate('');
            setQuantity('');
            setExtra('');
          } else {
            alert('Process Failed');
          }
        },
      );
    });

    setStock({
      date: date,
      img_data: imgData,
      item_name: itemName,
      item_size: itemSize,
      quantity: quantity,
      unit: unit,
      unit_rate: unitRate,
      ext: extra,
      total_amount: t_amount,
    });

    setRenderStock([
      {
        item_id: nextId(),
        date: date,
        item_name: itemName,
        item_size: itemSize,
        quantity: quantity,
        unit: unit,
        unit_rate: unitRate,
        ext: extra,
        total_amount: t_amount,
      },
      ...renderStock,
    ]);
  };

  const GetTotal = () => {
    let t = renderStock.map((v) => v.total_amount);

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return (
      <View
        style={{
          backgroundColor: 'yellow',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'green', fontSize: 24}}>
          G. total: {t.reduce(reducer, 0)}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    if (imgSizeToggle) {
      setImgWidth(330);
      setImgHeight(400);
    } else {
      setImgWidth(120);
      setImgHeight(100);
    }
  });

  // MAIN RETURN
  return (
    <SafeAreaView>
      <ChangeStatusBarColor backgroundColor={SUB_HEADER_COLOR} />

      {/* SUCCESS MESSAGE */}
      {updateMsg ? <MessageComponent title="Item added to list" /> : null}

      {/* ADD STOCKS FIELDS */}
      <View
        style={{
          minHeight: 325,
        }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 5,
              borderBottomColor: 'gray',
              padding: 20,
            }}>
            {/* image from gallery ---------------------------------*/}
            <View
              style={{
                alignItems: 'center',
                borderBottomWidth: 1,
              }}>
              <TouchableOpacity
                onPress={() => setImgSizeToggle(!imgSizeToggle)}>
                <Image
                  source={{
                    uri: `data:${imgMime};base64,${imgData}`,
                  }}
                  style={{
                    width: imgWidth,
                    height: imgHeight,
                    borderRadius: 10,
                  }}
                  // resizeMode="contain"
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  minWidth: '100%',
                  maxWidth: '100%',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <CustomBtn
                  txtColor="green"
                  title="Image From Gallery"
                  onBtnPress={imgFromGallery}
                  style={{width: '50%'}}
                />

                <CustomBtn
                  txtColor="green"
                  title="Take photo"
                  onBtnPress={imgFromCamera}
                  style={{
                    width: '40%',
                  }}
                />
              </View>
            </View>

            {/* item name */}
            <View>
              <SwitchBetweenPickerAndInput
                title="Select Item"
                name="item_name"
                selectedValue={itemName}
                onValueChange={(n) => setItemName(n.trim().toUpperCase())}
                dropdownList={itemStock}
              />
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
                onValueChange={(itemValue, itemIndex) =>
                  setItemSize(itemValue)
                }>
                <Picker.Item label="FREE-SIZE" value="FREE-SIZE" />
                <Picker.Item label="XXL" value="XXL" />
                <Picker.Item label="XL" value="XL" />
                <Picker.Item label="LARGE" value="LARGE" />
                <Picker.Item label="MEDIUM" value="MEDIUM" />
                <Picker.Item label="SMALL" value="SMALL" />
                <Picker.Item label="EXTRA-SMALL" value="EXTRA-SMALL" />
              </Picker>
            </View>

            {/* item unitRate */}
            <CustomInput
              title="Price Per Unit"
              placeholder="unitRate"
              onChangeText={(unt) => setUnitRate(unt)}
              keyboardType="numeric"
              value={unitRate}
            />

            {/* quantity */}
            <CustomInput
              title="Quantity"
              placeholder="Quantity"
              onChangeText={(qnt) => setQuantity(qnt)}
              maxLength={10}
              keyboardType="numeric"
              // style={{padding: 10}}
              value={quantity}
            />

            {/* Extra */}
            <CustomInput
              title="Extra"
              placeholder="Extra"
              onChangeText={(qnt) => setExtra(qnt)}
              maxLength={10}
              keyboardType="numeric"
              value={extra}
            />

            <CustomBtn
              txtColor="#fff"
              title="Submit"
              onBtnPress={add_stock}
              style={{backgroundColor: 'green', width: '100%'}}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>

      {/* FOR DISPLAY ADDED ITEMS ON SCREEN */}
      <View
        style={{
          backgroundColor: 'green',
          marginVertical: 10,
          maxHeight: 250,
          width: '100%',
          alignItems: 'flex-start',
        }}>
        <GetTotal />
        <ScrollView>
          {renderStock.map((v) => (
            <View
              key={nextId()}
              style={{
                marginVertical: 5,
                backgroundColor: '#fff',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              <View style={styles.content}>
                <Text>ID: {v.item_id}</Text>
              </View>
              <View style={styles.content}>
                <Text>Item: {v.item_name}</Text>
              </View>

              <View style={styles.content}>
                <Text>quantity: {v.quantity}</Text>
              </View>

              <View style={styles.content}>
                <Text>price: {v.unit_rate}</Text>
              </View>

              <View style={styles.content}>
                <Text>extra: {v.ext}</Text>
              </View>

              <View style={styles.content}>
                <Text>size: {v.item_size}</Text>
              </View>

              <View style={styles.content}>
                <Text>Total: {v.total_amount}</Text>
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
  itemStock: state.itemStock.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStocksItem);
