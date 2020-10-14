import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {MAIN_BTN_COLOR} from '../colorsConst/colorConst';

const CustomBtn = (props) => {
  return (
    <TouchableOpacity
      style={[style.btnStyle, props.style]}
      onPress={props.onBtnPress}>
      <Text style={{color: props.txtColor}}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
    // backgroundColor: MAIN_BTN_COLOR,
    color: '#ffffff',
    padding: 10,
    margin: 10,
    // marginHorizontal: 15,
    minWidth: '40%',
    fontWeight: 'bold',
    borderRadius: 8,
    borderWidth: 1,
  },
  text: {
    color: '#fff',
  },
});
export default CustomBtn;
