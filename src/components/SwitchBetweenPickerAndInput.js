import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomInput from './CustomInput';
import DropdownPicker from './DropdownPicker';

const SwitchBetweenPickerAndInput = ({
  selectedValue,
  onValueChange,
  dropdownList,
  name,
  title,
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
      <View style={{minWidth: 120}}>
        {switchPickerInput ? (
          <DropdownPicker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            dropdownList={dropdownList}
            name={name}
            title={title}
          />
        ) : (
          <CustomInput
            style={{padding: 0, margin: 0}}
            placeholder={name}
            onChangeText={onValueChange}
            // value={itemName}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => setSwitchPickerInput(!switchPickerInput)}
        style={{
          backgroundColor: 'grey',
          width: 30,
          height: 30,
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'orange',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          S
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SwitchBetweenPickerAndInput;
