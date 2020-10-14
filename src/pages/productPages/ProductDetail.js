import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {
  BG_COLOR,
  DISABLED_COLOR,
  TITLE_COLOR,
  TXT_COLOR,
  BROWNSEVEN,
} from '../../colorsConst/colorConst';

// RANDOM ID GENERATE
import nextId from 'react-id-generator';
import ChangeStatusBarColor from '../../components/ChangeStatusBarColor';
import AddProduct from './AddProduct';

// database
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'stockDatabase.db'});

// MAIN FUNC------------------------======================================------------------------
const ProductDetail = ({navigation, productReducer}) => {
  const [listData, setListData] = useState(productReducer);
  const [showAddProduct, setShowAddProduct] = useState(false);

  let itemId = 0;

  useEffect(() => {
    setShowAddProduct(false);
  }, []);

  let changeClr = () => {
    if (showAddProduct) {
      return {backgroundColor: 'red'};
    } else {
      return {backgroundColor: 'green'};
    }
  };

  // DELETE PRODUCT BY ID
  let deleteProductById = (item) => {
    itemId = item.product_id;

    if (itemId === item.product_id) {
      Alert.alert(
        'Warning',
        `Are you sure want to Product: ${item.product_name}`,
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
    }
  };

  const getDbId = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  product_table where product_id=?',
        [itemId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Item deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    let data = listData.filter((i) => i.product_id !== itemId);
                    setListData(data);
                  },
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

  const ProductListViewComponent = (item) => {
    return (
      <SafeAreaView>
        <View
          key={item.product_id}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: '#fff',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            borderRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={{color: 'brown', fontSize: 18}}>{item.date}</Text>

            <View
              style={{
                flexDirection: 'row',
                minWidth: 90,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: '#000',
                  backgroundColor: 'orange',
                  fontSize: 20,
                  borderRadius: 10,
                }}>
                &#9998;
              </Text>

              {/* delete button */}
              <Text
                onPress={() => deleteProductById(item)}
                style={{
                  paddingHorizontal: 10,
                  color: '#fff',
                  backgroundColor: 'red',
                  fontSize: 20,
                  borderRadius: 10,
                }}>
                &#10007;
              </Text>
            </View>
          </View>

          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Name</Text>
            <Text style={styles.resultTxt}>{item.product_name}</Text>
          </View>
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>model</Text>
            <Text style={styles.resultTxt}>{item.model}</Text>
          </View>
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>Size</Text>
            <Text style={styles.resultTxt}>{item.item_size}</Text>
          </View>
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>CP Rate</Text>
            <Text style={styles.resultTxt}>V9{item.cp_rate}0</Text>
          </View>
          <View style={styles.selfView}>
            <Text style={{color: TITLE_COLOR}}>SP Rate</Text>
            <Text style={styles.resultTxt}>{item.sp_rate}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ChangeStatusBarColor
        backgroundColor={BROWNSEVEN}
        barStyle="light-content"
      />

      <View
        style={{
          flex: 1,
          backgroundColor: BROWNSEVEN,
        }}>
        <View style={styles.selfView}>
          <Text style={{color: TITLE_COLOR}}>
            Total Product: {productReducer.length}
          </Text>
        </View>

        {/* EMP LIST */}
        <View style={{flex: 1}}>
          <FlatList
            data={productReducer}
            initialNumToRender={7}
            keyExtractor={() => nextId()}
            initialNumToRender={5}
            onEndReachedThreshold={0.01}
            removeClippedSubviews={true}
            renderItem={({item}) => ProductListViewComponent(item)}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          />
        </View>

        {showAddProduct ? <AddProduct /> : null}

        {/* ADD BTN */}
        <TouchableOpacity
          onPress={() => setShowAddProduct(!showAddProduct)}
          style={[styles.addButtonContainer, changeClr()]}>
          {!showAddProduct ? (
            <Text style={styles.addButtonText}>+</Text>
          ) : (
            <Text style={styles.closeBtnText}>Close</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// STYLE
const styles = StyleSheet.create({
  addButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 50,
    right: 50,
    // backgroundColor: 'green',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 15,
  },
  addButtonText: {fontSize: 24, color: 'yellow'},
  closeBtnText: {fontSize: 24, color: '#fff'},
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
});

const mapStateToProps = (state) => ({
  productReducer: state.productReducer.reverse(),
});

export default connect(mapStateToProps)(ProductDetail);
