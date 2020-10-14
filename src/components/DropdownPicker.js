import React from 'react';
import {View} from 'react-native';

import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';

const DropdownPicker = ({
  dropdownList,
  name,
  selectedValue,
  onValueChange,
  title,
}) => {
  let nameArr = dropdownList.map((val) => {
    // if (name === 'customer_name') {
    //   return val.customer_name;
    // }

    // if (name === 'item_name') {
    //   return val.item_name;
    // }

    switch (name) {
      case 'customer_name':
        return val.customer_name;
      case 'item_name':
        return val.item_name;
      case 'customer_address':
        return val.customer_address;
      case 'customer_contact':
        return val.customer_contact;
      case 'emp_name':
        return val.emp_name;
      case 'product_name':
        return val.product_name;
      default:
        return val.item_name;
    }
  });
  let arrSet = new Set(nameArr);
  let uniqueArr = [...arrSet];

  return (
    <View
      style={{
        // marginHorizontal: 10,
        // marginVertical: 10,
        borderColor: 'blue',
        borderBottomWidth: 1,
        minWidth: 155,
        // maxWidth: 120,
        height: 40,
      }}>
      <Picker
        style={{color: 'blue'}}
        mode="dropdown"
        selectedValue={selectedValue}
        onValueChange={onValueChange}>
        <Picker.Item label={title} value={null} />
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
