import React, {memo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TITLE_COLOR, TXT_COLOR} from '../colorsConst/colorConst';

// RANDOM ID GENERATE
import nextId from 'react-id-generator';

const ListViewComp = ({item, onPress, navigation}) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={onPress}
        key={nextId()}
        style={{
          marginTop: 5,
          padding: 5,
          backgroundColor: '#fff',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {/* DATE */}
        {item.date ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={{color: 'brown', fontSize: 14}}>{item.date}</Text>
          </View>
        ) : null}

        {/* EMP NAME */}
        {item.emp_name ? (
          <View style={styles.selfView}>
            <Text style={{color: 'gray', fontSize: 10}}>Employee Name</Text>
            <Text style={styles.resultTxt}>{item.emp_name}</Text>
          </View>
        ) : null}

        {/* CUS NAME */}
        {item.customer_name ? (
          <View style={styles.selfView}>
            <Text style={{color: 'gray', fontSize: 10}}>Customer Name</Text>
            <Text style={styles.resultTxt}>{item.customer_name}</Text>
          </View>
        ) : null}

        {/* CUS ADDRESS */}
        {item.customer_address ? (
          <View style={styles.selfView}>
            <Text style={{color: 'gray', fontSize: 10}}>Customer Address</Text>
            <Text style={styles.resultTxt}>{item.customer_address}</Text>
          </View>
        ) : null}

        {/* CUS CONTACT */}
        {item.customer_contact ? (
          <View style={styles.selfView}>
            <Text style={{color: 'gray', fontSize: 10}}>Customer Contact</Text>
            <Text style={styles.resultTxt}>{item.customer_contact}</Text>
          </View>
        ) : null}

        {/* PRODUCT NAME*/}
        {item.product_name ? (
          <View style={styles.selfView}>
            <Text style={{color: 'gray', fontSize: 10}}>Product name</Text>
            <Text style={styles.resultTxt}>
              {item.product_name}
              {item.unit}
            </Text>
          </View>
        ) : null}

        {/* ITEM QUANTITY */}
        {item.qnt ? (
          <View style={styles.selfView}>
            <Text style={{color: 'gray', fontSize: 10}}>Quantity</Text>
            <Text style={styles.resultTxt}>
              {item.qnt}
              Pcs
            </Text>
          </View>
        ) : null}

        {/* ITEM unit rate */}
        {item.unit_rate ? (
          <View style={styles.selfView}>
            <Text style={{color: 'gray', fontSize: 10}}>Piece Rate</Text>
            <Text style={styles.resultTxt}>{item.unit_rate}</Text>
          </View>
        ) : null}

        {/* TOTAL AMOUNT*/}
        {item.total_amt ? (
          <View style={styles.selfView}>
            <Text style={{color: 'gray', fontSize: 10}}>Total Amount</Text>
            <Text style={styles.resultTxt}>{item.total_amt}</Text>
          </View>
        ) : null}

        {/* TOTAL AMOUNT*/}
        {item.amount ? (
          <View style={styles.selfView}>
            <Text style={{color: 'gray', fontSize: 10}}>Total Amount</Text>
            <Text style={styles.resultTxt}>{item.amount}</Text>
          </View>
        ) : null}

        {/* IS PAID*/}
        {/* {item.is_clear ? (
          <View style={styles.selfView}>
            <Text style={{color: 'gray', fontSize: 10}}>Is paid</Text>
            <Text style={styles.resultTxt}>{item.is_clear}</Text>
          </View>
        ) : null} */}

        {/*DESCRIPTION*/}
        {item.description ? (
          <View style={styles.selfView}>
            <Text style={{color: 'gray', fontSize: 10}}>Description</Text>
            <Text style={styles.resultTxt}>{item.description}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  resultTxt: {color: TXT_COLOR, fontWeight: 'bold', fontSize: 12},

  selfView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minWidth: 40,
    minHeight: 40,
    paddingHorizontal: 2,
    margin: 2,
  },
});

export default ListViewComp;
