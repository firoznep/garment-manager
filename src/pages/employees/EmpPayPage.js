import {Picker} from '@react-native-community/picker';
import React, {useState} from 'react';

// RANDOM ID GENERATE
import nextId from 'react-id-generator';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {BTN_COLOR} from '../../colorsConst/colorConst';
import ChangeStatusBarColor from '../../components/ChangeStatusBarColor';
import ListViewComp from '../../components/ListViewComp';

// MAIN FUNC============--=-=-=-=-=------------------====================
const EmpPayPage = ({empPayReducer}) => {
  const [listData, setListData] = useState(
    empPayReducer.filter(
      (d) => d.date === new Date().toDateString() && d.is_clear === 'Pending',
    ),
  );

  const [filterByName, setFilterByName] = useState(new Date().toDateString());

  // SHORT BY NAME OR DATE FUNC
  let nameArr = empPayReducer.map((val) => val.emp_name);
  let arrSet = new Set(nameArr);
  let uniqueArr = [...arrSet];

  // FILTER BY FUNC
  let onFilter = () => {
    let dt = empPayReducer.filter(
      (v) => v.emp_name === filterByName && v.is_clear === 'Pending',
    );

    setListData(dt);
  };

  return (
    <SafeAreaView>
      <ChangeStatusBarColor barStyle="light-content" backgroundColor="orange" />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Picker
          style={{color: '#000', width: 170, padding: 0, margin: 0}}
          selectedValue={filterByName}
          onValueChange={(v) => setFilterByName(v)}>
          <Picker.Item label="Filter by" value="" />
          {uniqueArr.map((elm) => {
            return <Picker.Item label={elm} value={elm} key={elm} />;
          })}
        </Picker>

        <TouchableOpacity
          onPress={onFilter}
          style={{
            backgroundColor: BTN_COLOR,
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            paddingHorizontal: 10,
            borderRadius: 10,
            // width: '100%',
          }}>
          <Text
            style={{
              color: '#fff',
            }}>
            Filter
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listData}
        keyExtractor={() => nextId()}
        initialNumToRender={5}
        onEndReachedThreshold={0.01}
        removeClippedSubviews={true}
        renderItem={({item}) => <ListViewComp item={item} />}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  empPayReducer: state.empPayReducer.reverse(),
});

export default connect(mapStateToProps)(EmpPayPage);
