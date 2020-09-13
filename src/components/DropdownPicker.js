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
      default:
        return val.item_name;
    }
  });
  let arrSet = new Set(nameArr);
  let uniqueArr = [...arrSet];

  return (
    <View
      style={{
        // marginHorizontal: 15,
        // marginVertical: 10,
        borderColor: '#689F38',
        borderBottomWidth: 1,
        minWidth: 100,
        maxWidth: 120,
        height: 40,
      }}>
      <Picker
        // style={{marginTop: 24}}
        mode="dropdown"
        // style={{marginTop: 10}}
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
