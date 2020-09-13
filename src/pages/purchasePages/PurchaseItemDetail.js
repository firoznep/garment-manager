import React from 'react';
import {Text, View} from 'react-native';

const PurchseDetail = ({navigation}) => {
  return (
    <View>
      <Text onPress={() => navigation.navigate('AddPurchase')}>
        PurchaseDetail
      </Text>
    </View>
  );
};

export default PurchseDetail;
