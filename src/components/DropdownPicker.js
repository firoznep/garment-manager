import React from 'react';
import {View} from 'react-native';

import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';

const DropdownPicker = ({stock, selectedValue, onValueChange}) => {
  let nameArr = stock.map((val) => val.item_name);
  let arrSet = new Set(nameArr);
  let uniqueArr = [...arrSet];

  return (
    <View
      style={{
        // marginHorizontal: 15,
        marginVertical: 10,
        borderColor: '#689F38',
        borderBottomWidth: 1,
        minWidth: 200,
      }}>
      <Picker
        style={{marginTop: 24}}
        mode="dropdown"
        // style={{marginTop: 10}}
        selectedValue={selectedValue}
        onValueChange={onValueChange}>
        <Picker.Item label="Select name" value={null} />
        {uniqueArr.map((elm) => {
          return <Picker.Item label={elm} value={elm} key={elm} />;
        })}
      </Picker>
    </View>
  );
};

const mapStateToProps = (state) => ({
  stock: state.itemStock,
});

export default connect(mapStateToProps)(DropdownPicker);
