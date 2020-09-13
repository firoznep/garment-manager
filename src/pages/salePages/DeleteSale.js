import React, {useState} from 'react';
import {
  Text,
  View,
  Alert,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {Picker} from '@react-native-community/picker';

// database
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'stockDatabase.db'});

import {connect} from 'react-redux';
import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';

// DELETE FUNC COMPONENT
const DeleteSale = ({navigation, saleReducer}) => {
  let [itemName, setItemName] = useState('Select name');
  let [itemId, setItemId] = useState(0);

  let deleteSaleItem = () => {
    if (itemId) {
      Alert.alert(
        'Warning',
        `Are you sure want to delete id number: ${itemId}`,
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
    } else if (itemName.length > 0 && itemId === 0) {
      Alert.alert(
        'Warning',
        `Are you sure want to delete all ${itemName}. This will delete all ${itemName}`,
        [
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
          },
          {
            text: 'Ok',
            onPress: () => getDbName(),
          },
        ],

        {cancelable: false},
      );
    }
  };

  const getDbName = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  sale_table where item_name=?',
        [itemName],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Item deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Dashboard'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid Item-name');
          }
        },
      );
    });
  };

  const getDbId = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  sale_table where item_id=?',
        [itemId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Item deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Dashboard'),
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

  // FOR GETTING ITEM_NAME FROM STOCK AND PASSED TO PICKER
  let nameArr = saleReducer.map((val) => val.item_name);
  let arrSet = new Set(nameArr);
  let uniqueArr = [...arrSet];
  let imgMime = 'image/jpg';

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
        <View style={{flex: 1, marginHorizontal: 15}}>
          {/* SIZE PICKER*/}
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 10,
              borderColor: '#689F38',
              borderWidth: 1,
            }}>
            <Picker
              // style={{your_style}}
              mode="dropdown"
              selectedValue={itemName}
              onValueChange={(n) => {
                setItemName(n);
              }}>
              <Picker.Item label="Select name" value="" />
              {uniqueArr.map((elm) => {
                return <Picker.Item label={elm} value={elm} key={elm} />;
              })}
            </Picker>
          </View>

          <Text
            onPress={() => setItemId(0)}
            style={{
              // backgroundColor: 'red',
              width: 200,
              padding: 5,
              color: 'black',
              fontSize: 20,
              textAlign: 'center',
              borderWidth: 1,
              marginVertical: 10,
            }}>
            ID number: {itemId}
          </Text>

          <ScrollView>
            {saleReducer.map((item) =>
              item.item_name === itemName ? (
                <TouchableOpacity
                  onPress={() => {
                    setItemId(item.item_id);
                  }}
                  style={{
                    alignItems: 'center',
                    marginVertical: 20,
                  }}
                  key={item.item_id}>
                  <View>
                    <Text>Date: {item.date}</Text>
                    <Text>Invoice N.: {item.env_num}</Text>
                    <Text>Item ID: {item.item_id}</Text>
                    <Text>Sale Rate: Rs.{item.sale_rate}</Text>
                    <Text>Quantity: {item.qnt}</Text>
                    <Text>Total Amount: Rs{item.total_amt}</Text>
                  </View>
                </TouchableOpacity>
              ) : null,
            )}
          </ScrollView>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <CustomBtn
              style={{
                backgroundColor: 'red',
                alignItems: 'center',
                padding: 15,
                paddingHorizontal: 40,
              }}
              title="Delete"
              onBtnPress={deleteSaleItem}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  saleReducer: state.saleReducer.reverse(),
});

export default connect(mapStateToProps)(DeleteSale);
