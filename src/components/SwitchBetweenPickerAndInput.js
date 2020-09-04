import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomInput from './CustomInput';
import DropdownPicker from './DropdownPicker';

const SwitchBetweenPickerAndInput = ({
  selectedValue,
  onValueChange,
  dropdownList,
  name,
}) => {
  const [switchPickerInput, setSwitchPickerInput] = useState(true);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        // marginVertical: 10,
      }}>
      <View style={{minWidth: 200}}>
        {switchPickerInput ? (
          <DropdownPicker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            dropdownList={dropdownList}
            name={name}
          />
        ) : (
          <CustomInput
            placeholder="Enter item Name"
            onChangeText={onValueChange}
            // value={itemName}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => setSwitchPickerInput(!switchPickerInput)}
        style={{
          backgroundColor: 'grey',
          width: 50,
          height: 50,
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'orange',
            fontSize: 34,
            fontWeight: 'bold',
          }}>
          S
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SwitchBetweenPickerAndInput;
