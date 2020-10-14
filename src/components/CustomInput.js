import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {TXT_COLOR, DISABLED_COLOR, BTN_COLOR} from '../colorsConst/colorConst';

const CustomInput = (props) => {
  return (
    <View
      style={{
        marginHorizontal: 5,
        borderColor: '#689F38',
        borderBottomWidth: 1,
      }}>
      <Text style={{color: BTN_COLOR, fontSize: 12}}>{props.title}</Text>
      <TextInput
        style={{padding: 0}}
        underlineColorAndroid="transparent"
        placeholderTextColor={DISABLED_COLOR}
        blurOnSubmit={false}
        // autoCapitalize="none"
        selectTextOnFocus={true}
        {...props}></TextInput>
    </View>
  );
};

export default CustomInput;
