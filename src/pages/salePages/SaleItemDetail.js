import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';

import {openDatabase} from 'react-native-sqlite-storage';
import {addSale, resetSaleState} from '../../redux/action/saleAction';
import CustomBtn from '../../components/CustomBtn';
import {Picker} from '@react-native-community/picker';
import {
  BTN_COLOR,
  BTN_COLOR_TWO,
  BG_COLOR,
  DISABLED_COLOR,
  TXT_COLOR,
} from '../../colorsConst/colorConst';
import MessageComponent from '../../components/MessageComponent';
let db = openDatabase({name: 'stockDatabase.db'});

const SaleDetail = ({
  saleReducer,
  setSaleReducer,
  setresetSaleState,
  navigation,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  let [imgMime, setImgMime] = useState('image/jpg');

  const [shorting, setShorting] = useState('name');
  let [filterBy, setFilterBy] = useState(new Date().toDateString());

  const [saleData, setSaleData] = useState(
    saleReducer.filter((d) => d.date === new Date().toDateString()),
  );

  let [newDate, setNewDate] = useState(new Date().toDateString());

  let [updateMsg, setUpdateMsg] = useState(false);

  let onFilter = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM sale_table where item_name = ? or date = ?',
        [filterBy, filterBy],
        (tx, results) => {
          setSaleData([]);
          var len = results.rows.length;
          if (len > 0) {
            let dts = [];
            for (let i = 0; i < len; ++i) {
              dts.push(results.rows.item(i));
            }
            setSaleData(dts.reverse());
            setUpdateMsg(true);
            setTimeout(() => {
              setUpdateMsg(false);
            }, 2000);
          } else {
            alert('No data found');
          }
        },
      );
    });
  };

  let filterByNameAndDate = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM sale_table where item_name = ? and date = ?',
        [filterBy, newDate],
        (tx, results) => {
          setSaleData([]);
          var len = results.rows.length;
          if (len > 0) {
            let dts = [];
            for (let i = 0; i < len; ++i) {
              dts.push(results.rows.item(i));
            }
            setSaleData(dts.reverse());

            setUpdateMsg(true);
            setTimeout(() => {
              setUpdateMsg(false);
            }, 2000);
          } else {
            alert('No data found');
          }
        },
      );
    });
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.item_id}
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderColor: 'red',
          borderWidth: 2,
          margin: 10,
        }}>
        {/* ITEM DATE AND ID */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            marginBottom: 10,
          }}>
          <Text>Item Id = {item.item_id}</Text>
          <Text style={{padding: 2}}>{item.date}</Text>
        </View>

        {/* customer NAME */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
          }}>
          <Text>Customer Name = {/* <TouchableOpacity> */}</Text>
          <Text style={{color: '#E91E63', fontWeight: 'bold', fontSize: 24}}>
            {item.customer_name}
          </Text>
          {/* </TouchableOpacity> */}
        </View>

        {/* ITEM NAME */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
          }}>
          <Text>Item Name = {/* <TouchableOpacity> */}</Text>
          <Text style={{color: '#E91E63', fontWeight: 'bold', fontSize: 24}}>
            {item.item_name}
          </Text>
          {/* </TouchableOpacity> */}
        </View>

        {/* ITEM QUANTITY */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
          }}>
          <Text>quantity = </Text>
          <Text style={{fontSize: 20, color: '#C2185B', fontWeight: 'bold'}}>
            {item.qnt}
            {item.unit}
          </Text>
        </View>

        {/* env num */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
          }}>
          <Text>ENV NUM = </Text>
          <Text>{item.env_num}</Text>
        </View>

        {/* ITEM size */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
          }}>
          <Text>Size =</Text>
          <Text>{item.item_size}</Text>
        </View>

        {/* discount*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
          }}>
          <Text>Discount =</Text>
          <Text>{item.discount}</Text>
        </View>

        {/* ITEM unit rate */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
          }}>
          <Text>U. R. =</Text>
          <Text>{item.sale_rate}</Text>
        </View>

        {/* TOTAL AMOUNT*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
          }}>
          <Text>T. A. =</Text>
          <Text>{item.total_amt}</Text>
        </View>
        {/*  */}

        {/* PAID AMOUNT */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
          }}>
          <Text>Payment =</Text>
          <Text>{item.balance}</Text>
        </View>
      </View>
    );
  };

  let nameArr = saleReducer.map((val) => {
    switch (shorting) {
      case 'name':
        return val.item_name;
      case 'date':
        return val.date;

      default:
        return 'No Data';
    }
  });
  let arrSet = new Set(nameArr);
  let uniqueArr = [...arrSet];

  let nDt = saleReducer.map((val) => val.date);
  let nSet = new Set(nDt);
  let nUnique = [...nSet];

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const GetTotal = () => {
    let d = [];
    let p = [];
    saleReducer.map((v) => {
      if (
        (v.item_name === filterBy && v.date === newDate) ||
        v.date === filterBy
      ) {
        d.push(v.total_amt);
        p.push(v.qnt);
      }
    });

    return (
      <View>
        <Text style={{color: '#fff'}}>
          Total Piece by date: {p.reduce(reducer, 0)}
        </Text>
        <Text style={{color: '#fff'}}>
          Total amount: {d.reduce(reducer, 0)}
        </Text>
      </View>
    );
  };

  const GetAllPieces = () => {
    let q = [];
    let a = [];
    saleReducer.map((v) => {
      if (v.item_name === filterBy || v.date === filterBy) {
        q.push(v.qnt);
        a.push(v.total_amt);
      }
    });

    return (
      <View>
        <Text style={{color: '#fff'}}>Count: {saleData.length}</Text>
        <Text style={{color: '#fff'}}>
          G.T. {filterBy}: {q.reduce(reducer, 0)}
        </Text>
        <Text style={{color: '#fff'}}>G.T. amount: {a.reduce(reducer, 0)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: BG_COLOR,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}>
          <Picker
            style={{color: 'white', width: '30%'}}
            selectedValue={shorting}
            onValueChange={(v) => setShorting(v)}>
            <Picker.Item label="name" value="name" />
            <Picker.Item label="date" value="date" />
          </Picker>

          <Picker
            style={{color: 'white', width: '32%'}}
            selectedValue={filterBy}
            onValueChange={(v) => setFilterBy(v)}>
            <Picker.Item label="Select name or date" value="" />
            {uniqueArr.map((elm) => {
              return <Picker.Item label={elm} value={elm} key={elm} />;
            })}
          </Picker>
          <TouchableOpacity
            style={{
              backgroundColor: 'grey',
              borderRadius: 10,
              alignItems: 'center',
              // justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                // fontSize: 34,
                fontWeight: 'bold',
                padding: 10,
              }}
              onPress={onFilter}>
              by Name
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowFlexcontaier}>
          <Picker
            style={{color: 'white', minWidth: '49%'}}
            selectedValue={newDate}
            onValueChange={(v) => setNewDate(v)}>
            <Picker.Item label="Select Date" value="" />
            {nUnique.map((elm) => {
              return <Picker.Item label={elm} value={elm} key={elm} />;
            })}
          </Picker>

          <TouchableHighlight
            style={{
              backgroundColor: 'grey',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
              marginRight: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
              }}
              onPress={filterByNameAndDate}>
              By Name and Date
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.rowFlexcontaier}>
          <GetAllPieces />

          <GetTotal />
        </View>

        <View style={{flex: 1, backgroundColor: 'green'}}>
          <FlatList
            data={saleData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </View>

        {updateMsg ? <MessageComponent title="Data Refreshed" /> : null}

        <TouchableOpacity
          onPress={() => navigation.navigate('AddSaleItem')}
          style={styles.addButtonContainer}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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

  selfView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minWidth: 80,
    minHeight: 80,
    padding: 5,
    margin: 5,
  },
});

const mapStateToProps = (state) => ({
  saleReducer: state.saleReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setSaleReducer: (stk) => dispatch(addSale(stk)),
  setresetSaleState: () => dispatch(resetSaleState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleDetail);
