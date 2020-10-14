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

import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';

import {Picker} from '@react-native-community/picker';

// database
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'stockDatabase.db'});

import {connect} from 'react-redux';

// DELETE FUNC COMPONENT
const DeleteStock = ({navigation, stock}) => {
  let [itemName, setItemName] = useState('Select name');
  let [itemId, setItemId] = useState(0);

  let deleteStock = () => {
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
        'DELETE FROM  stock_table where item_name=?',
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
        'DELETE FROM  stock_table where item_id=?',
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
  let nameArr = stock.map((val) => val.item_name);
  let arrSet = new Set(nameArr);
  let uniqueArr = [...arrSet];
  let imgMime = 'image/jpg';

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
        <Text>
          if you want to delete all item by name, than select name and reset id
          number to ( 0 )
        </Text>
        <Text>
          or if you want to delete only one item, then tap on any image that you
          want to delete, this will give you an id number.
        </Text>
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
            {stock.map((item) =>
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
                  <Image
                    source={{
                      uri: `data:${imgMime};base64,${item.img_data}`,
                    }}
                    style={{width: 200, height: 200, borderRadius: 20}}
                  />
                </TouchableOpacity>
              ) : null,
            )}
            <View style={{alignItems: 'center', marginBottom: 20}}>
              <CustomBtn
                style={{
                  backgroundColor: 'red',
                  alignItems: 'center',
                  padding: 15,
                  paddingHorizontal: 40,
                }}
                title="Delete"
                onBtnPress={deleteStock}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  stock: state.itemStock,
});

export default connect(mapStateToProps)(DeleteStock);
