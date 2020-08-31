import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {TXT_COLOR, DISABLED_COLOR} from '../colorsConst/colorConst';

const CustomInput = (props) => {
  return (
    <View
      style={{
        marginVertical: 10,
        borderColor: '#689F38',
        borderBottomWidth: 1,
      }}>
      <Text style={{color: TXT_COLOR, fontSize: 18}}>{props.title}</Text>
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor={DISABLED_COLOR}
        blurOnSubmit={false}
        autoCapitalize="none"
        selectTextOnFocus={true}
        {...props}></TextInput>
    </View>
  );
};

export default CustomInput;
