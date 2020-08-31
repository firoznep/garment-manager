import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {MAIN_BTN_COLOR} from '../colorsConst/colorConst';

const CustomBtn = (props) => {
  return (
    <TouchableOpacity
      style={[style.btnStyle, props.style]}
      onPress={props.onBtnPress}>
      <Text style={style.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
    backgroundColor: MAIN_BTN_COLOR,
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginHorizontal: 15,
    minWidth: '40%',
    fontWeight: 'bold',
    borderRadius: 8,
  },
  text: {
    color: '#fff',
  },
});
export default CustomBtn;
