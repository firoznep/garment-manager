import React from 'react';
import {View, Text} from 'react-native';
import ChangeStatusBarColor from './ChangeStatusBarColor';
import {HEADER_COLOR} from '../colorsConst/colorConst';

const MessageComponent = (props) => {
  return (
    <View
      style={{
        backgroundColor: HEADER_COLOR,
        padding: 10,
        width: '100%',
        alignItems: 'center',
      }}>
      <Text style={{color: '#fff', fontSize: 20}}>{props.title}</Text>
    </View>
  );
};

export default MessageComponent;
