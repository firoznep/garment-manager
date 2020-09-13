import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ChangeStatusBarColor from '../../components/ChangeStatusBarColor';

// FOR DATABASE SQLITE
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'stockDatabase.db'});

// COMPONENTS
import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';
import {connect} from 'react-redux';
import {
  addEmpAction,
  addEmpProductAction,
} from '../../redux/action/employeeAction';

// MAIN FUNCTION ===============================================================
const AddEmployees = ({
  empReducer,
  setEmpReducer,
  empProductReducer,
  setEmpProductReducer,
}) => {
  // STATES
  const [hireDate, setHireDate] = useState(new Date().toDateString());
  const [empName, setEmpName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  // DISPLAY DATA ON SCREEN
  const [renderEmpList, setEmpList] = useState([]);

  // SET SUCCESS MESSAGE
  const [updateMsg, setUpdateMsg] = useState(false);

  // ADD EMPLOYEES FUNC
  const onAddEmp = () => {
    if (!empName) {
      alert('Please fill name');
      return;
    }
    if (!jobTitle) {
      alert('Please fill job title');
      return;
    }
    if (!address) {
      alert('Please fill address');
      return;
    }
    if (!contact) {
      alert('Please fill contact');
      return;
    }

    db.transaction(function (txn) {
      // INSERT ITEM INTO TABLE
      txn.executeSql(
        'INSERT INTO employee_table (hire_date, emp_name, job_title, emp_address, emp_contact) values (?,?,?,?,?)',
        [hireDate, empName, jobTitle, address, contact],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            setEmpName('');
            setJobTitle('');
            setAddress('');
            setContact('');

            setUpdateMsg(true);
            setTimeout(() => {
              setUpdateMsg(false);
            }, 2000);
          } else {
            alert('Process Failed');
          }
        },
      );
    });

    setEmpReducer({
      hire_date: hireDate,
      emp_name: empName,
      job_title: jobTitle,
      emp_address: address,
      emp_contact: contact,
    });

    setEmpList([
      ...renderEmpList,
      {
        hire_date: hireDate,
        emp_name: empName,
        job_title: jobTitle,
        emp_address: address,
        emp_contact: contact,
      },
    ]);
  };

  return (
    <SafeAreaView>
      <ChangeStatusBarColor
        backgroundColor={'orange'}
        barStyle="dark-content"
      />

      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            // flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            // borderBottomWidth: 5,
            // borderBottomColor: 'gray',
            padding: 20,
          }}>
          {/* EMPLOYEE NAME */}
          <CustomInput
            placeholder="Emp Name"
            title="Employee name"
            onChangeText={(n) => setEmpName(n)}
            value={empName}
          />

          {/* JOB TITLE*/}
          <CustomInput
            placeholder="Job Title"
            title="Job Title"
            onChangeText={(n) => setJobTitle(n)}
            value={jobTitle}
          />

          {/* ADDRESS */}
          <CustomInput
            placeholder="Address"
            title="Address"
            onChangeText={(n) => setAddress(n)}
            value={address}
          />

          {/* CONTACT*/}
          <CustomInput
            placeholder="Contact"
            title="Contact"
            onChangeText={(n) => setContact(n)}
            value={contact}
            keyboardType="numeric"
            maxLength={10}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <CustomBtn title="Add" onBtnPress={onAddEmp} />

      {/* FOR DISPLAY ADDED ITEMS ON SCREEN */}
      <View
        style={{
          backgroundColor: 'gray',
          marginVertical: 10,
          maxHeight: 250,
          width: '100%',
          alignItems: 'flex-start',
        }}>
        <ScrollView>
          {renderEmpList.map((v) => (
            <View
              key={`${v.employee_id}-${v.emp_name}`}
              style={{
                marginVertical: 5,
                backgroundColor: 'green',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              <View style={styles.content}>
                <Text>Hire Date: {v.hire_date}</Text>
              </View>
              <View style={styles.content}>
                <Text>Employee Name: {v.emp_name}</Text>
              </View>
              <View style={styles.content}>
                <Text>Job Title: {v.job_title}</Text>
              </View>

              <View style={styles.content}>
                <Text>Address: {v.emp_address}</Text>
              </View>

              <View style={styles.content}>
                <Text>Contact: {v.emp_contact}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 5,
  },
});

const mapStateToProps = (state) => ({
  empReducer: state.empReducer.reverse(),
  empProductReducer: state.empProductReducer.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setEmpReducer: (stk) => dispatch(addEmpAction(stk)),
  setEmpProductReducer: (stk) => dispatch(addEmpProductAction(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployees);
