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
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';

import {addItem, resetItemState} from '../../redux/action/StockAction';

// FOR DATABASE SQLITE
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'stockDatabase.db'});

import ChangeStatusBarColor from '../../components/ChangeStatusBarColor';
import {
  BTN_COLOR,
  BG_COLOR,
  TITLE_COLOR,
  TXT_COLOR,
  DISABLED_COLOR,
  BTN_COLOR_TWO,
  HEADER_COLOR,
} from '../../colorsConst/colorConst';
import {Picker} from '@react-native-community/picker';
import MessageComponent from '../../components/MessageComponent';

const ItemStocksDetail = ({itemStock, setStock, setResetState, navigation}) => {
  let [imgMime, setImgMime] = useState('image/jpg');

  const [shorting, setShorting] = useState('name');
  let [filterBy, setFilterBy] = useState(new Date().toDateString());

  let [listData, setListData] = useState(
    itemStock.filter((d) => d.date === new Date().toDateString()),
  );

  let [newDate, setNewDate] = useState(new Date().toDateString());

  let [updateMsg, setUpdateMsg] = useState(false);

  useEffect(() => {
    if (imgSizeToggle) {
      setImgWidth(330);
      setImgHeight(400);
    } else {
      setImgWidth(120);
      setImgHeight(100);
    }
  });

  // SET IMAGE WIDTH AND HEIGHT
  const [imgSizeToggle, setImgSizeToggle] = useState(false);
  const [imgWidth, setImgWidth] = useState(120);
  const [imgHeight, setImgHeight] = useState(100);

  const onFilter = () => {
    let dt = itemStock.filter(
      (v) => v.item_name === filterBy || v.date === filterBy,
      // v.emp_name === filterBy,
    );

    setListData(dt);

    setUpdateMsg(true);
    setTimeout(() => {
      setUpdateMsg(false);
    }, 2000);
  };

  let filterByNameAndDate = () => {
    // FILTER BY

    let dt = itemStock.filter(
      (v) => v.date === newDate && v.item_name === filterBy,
    );

    setListData(dt);

    setUpdateMsg(true);
    setTimeout(() => {
      setUpdateMsg(false);
    }, 2000);
  };

  let listItemView = (item) => {
    return (
      <SafeAreaView>
        <Text style={{color: '#fff', paddingTop: 10, fontSize: 24}}>
          {item.date}
        </Text>
        <View
          key={item.item_id}
          style={{
            padding: 10,
            backgroundColor: '#fff',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {/* ITEM DATE AND ID */}
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Item Id</Text>
            <Text style={styles.resultTxt}>{item.item_id}</Text>
          </View>

          <View style={styles.selfView}>
            <TouchableOpacity onPress={() => setImgSizeToggle(!imgSizeToggle)}>
              <Image
                source={{
                  uri: `data:${imgMime};base64,${item.img_data}`,
                }}
                style={{
                  width: imgWidth,
                  height: imgHeight,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
            <Text style={styles.resultTxt}>{item.item_name}</Text>
          </View>

          {/* ITEM QUANTITY */}
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>quantity</Text>
            <Text style={styles.resultTxt}>
              {item.quantity}
              {item.unit}
            </Text>
          </View>

          {/* ITEM size */}
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Size</Text>
            <Text style={styles.resultTxt}>{item.item_size}</Text>
          </View>
          {/* ITEM unit rate */}
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>U. R.</Text>
            <Text style={styles.resultTxt}>U3{item.unit_rate}6R</Text>
          </View>
          {/* TOTAL AMOUNT*/}
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>T. A.</Text>
            <Text style={styles.resultTxt}>A9{item.total_amount}5T</Text>
          </View>
          {/*  */}
          <Text style={styles.selfView}>{item.ext}</Text>
        </View>
      </SafeAreaView>
    );
  };
  // console.log('out: ', itemStock.length);
  // FOR GETTING ITEM_NAME FROM STOCK AND PASSED TO PICKER

  let nameArr = itemStock.map((val) => {
    switch (shorting) {
      case 'name':
        return val.item_name;
      case 'date':
        return val.date;

      default:
        return 'No Data';
    }
  });
  // let nameArr = itemStock.map((val) => val.item_name);
  let arrSet = new Set(nameArr);
  let uniqueArr = [...arrSet];

  let nDt = itemStock.map((val) => val.date);
  let nSet = new Set(nDt);
  let nUnique = [...nSet];

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const GetTotal = () => {
    let d = [];
    let p = [];
    itemStock.map((v) => {
      if (
        (v.item_name === filterBy && v.date === newDate) ||
        v.date === filterBy
      ) {
        d.push(v.total_amount);
        p.push(v.quantity);
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
    itemStock.map((v) => {
      if (v.item_name === filterBy || v.date === filterBy) {
        q.push(v.quantity);
        a.push(v.total_amount);
      }
    });

    return (
      <View>
        <Text style={{color: '#fff'}}>Count: {listData.length}</Text>
        <Text style={{color: '#fff'}}>
          G.T. {filterBy}: {q.reduce(reducer, 0)}
        </Text>
        <Text style={{color: '#fff'}}>G.T. amount: {a.reduce(reducer, 0)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ChangeStatusBarColor
        barStyle="light-content"
        backgroundColor={BG_COLOR}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: BG_COLOR,
        }}>
        {/* FILTER BY NAME */}
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
          <TouchableHighlight
            style={{
              backgroundColor: BTN_COLOR,
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              paddingHorizontal: 10,
              borderRadius: 10,
              width: '30%',
            }}>
            <Text
              style={{
                color: '#fff',
                // backgroundColor: BTN_COLOR,
                // padding: 10,
              }}
              onPress={onFilter}>
              by Name
            </Text>
          </TouchableHighlight>
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
              backgroundColor: BTN_COLOR_TWO,
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              paddingHorizontal: 10,
              borderRadius: 10,
              // width: '50%',
            }}>
            <Text
              style={{
                color: '#fff',
                // backgroundColor: BTN_COLOR,
                // padding: 10,
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

        <View style={{flex: 1}}>
          <FlatList
            data={listData}
            initialNumToRender={5}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddStocksItem')}
          style={styles.addButtonContainer}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {updateMsg ? <MessageComponent title="Data Refreshed" /> : null}
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
    backgroundColor: BTN_COLOR,
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
  itemStock: state.itemStock.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
  setResetState: () => dispatch(resetItemState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemStocksDetail);
