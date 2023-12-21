import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, FlatList , Image, Platform} from 'react-native';
import { Slider } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';


const FormComponent = ({ initialData, onSubmit, onClose }) => {
  const [title, setTitle] = useState(initialData.name || '');
  // const [subtasks, setSubtasks] = useState(
  //   initialData.subtasks.map(subtask => ({ title: subtask, checked: false }))
  // );
  const [dueDate, setDueDate] = useState(new Date(initialData.due || new Date()));
  const [repeat, setRepeat] = useState(initialData.repeat || 'Never');
  const [description, setDescription] = useState(initialData.description || '');
  const [assignTo, setAssignTo] = useState(initialData.assignedTo || 'Self');
  const [priority, setPriority] = useState(initialData.points || 1);
  const [show, setShow] = useState(false)


  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleSubmit = () => {
    const formData = {
      name: title,
      // subtasks,
      due: dueDate,
      repeat: repeat,
      assignedTo: assignTo,
      description: description,
      points: priority,
    };
    onSubmit(formData);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;

    if(Platform.OS != 'ios'){
      setDueDate(currentDate)
      setShow(false)
    }
    else{
      setDueDate(currentDate);
    }
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    }}>
      <View style={{
        margin: 20,
        width: '80%',
        height: '55%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: "2%",
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}>
        <ScrollView style={styles.container}>
          <View style={styles.inputAndLabel}>
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          
          <View style={styles.inputAndLabel}>
            { Platform.OS == 'ios' && (
              <>
                <Text style={styles.fieldTitle}>Due Date:</Text>
                <DateTimePicker
                  value={dueDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  style={styles.datePicker}
                />
              </>
              )
            }
            { Platform.OS != 'ios' && (
              <>
                <Text style={{
                  paddingRight: 5
                }}>{formatDate(dueDate)}</Text>
                <Button 
                  onPress={() => setShow(true)}
                  title="Choose another date"
                />
                { show && (
                  <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    style={styles.datePicker}
                  />
                  )
                }
              </>
              )
            }
          </View>
          
          <View style={{
            flexDirection: 'row',
            // alignItems: 'center',
            // paddingHorizontal: '20%',
            paddingTop: "2%"
          }}>
            <Text style={[styles.fieldTitle, {
              flex: 1,
              textAlign: 'center'
            }]}>Repeat:</Text>
            <Text style={[styles.fieldTitle, {
              flex: 1,
              textAlign: 'center'
            }]}>Assign To:</Text>
          </View>

          <View style={styles.inputAndLabel}>
            <Picker
              selectedValue={repeat}
              style={styles.picker}
              itemStyle={{fontSize: 15, height: 100}}
              onValueChange={(itemValue) => setRepeat(itemValue)}
            >
              {/* Picker Items */}
              <Picker.Item label="Never" value="Never" />
                <Picker.Item label="Daily" value="Daily" />
                <Picker.Item label="Weekly" value="Weekly" />
                <Picker.Item label="Monthly" value="Monthly" />
            </Picker>

            <Picker
              selectedValue={assignTo}
              style={styles.picker}
              itemStyle={{fontSize: 15, height: 100}}
              onValueChange={(itemValue) => setAssignTo(itemValue)}
            >
              {/* Picker Items */}
              <Picker.Item label="You" value="You" />
              <Picker.Item label="Sara" value="Sara" />
              <Picker.Item label="Lara" value="Lara" />
              <Picker.Item label="Lino" value="Lino" />
            </Picker>
          </View>
          
          <TextInput
            style={[styles.input, {
              fontSize: 12,
              height: '14%'
            }]}
            enterKeyHint='enter'
            placeholder="Description"
            value={description}
            multiline={true}
            onChangeText={setDescription}
          />

          <Text style={[styles.fieldTitle, {
            alignSelf: 'center', 
            paddingTop: "2%"
          }]}>Nuts</Text>
          <Slider
            // style={styles.slider}
            thumbStyle={{ height: 30,
              width: 30,
              backgroundColor: 'transparent',
              justifyContent: 'center',
            }}
            value={priority}
            onValueChange={setPriority}
            minimumValue={1}
            maximumValue={10}
            step={1}
            minimumTrackTintColor='purple'
            maximumTrackTintColor='black'
            allowTouchTrack
            thumbProps={{
              children: (
                <Image source={require('../assets/nut.png')} style={{
                  height: 30,
                  width: 30,
                  alignSelf: 'center',
                  
                }}/>
              )
            }}
          />
          
          <Text style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            paddingBottom: '2%'
          }}>{priority}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.inputAndLabel}>
              <Button title='Cancel' onPress={onClose} />
              <Button title='Done' onPress={() => handleSubmit()} />
            </View>  
          </View>
          
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: '2%',
    width: '100%',
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: '500',
    // marginBottom: 5,
  },
  inputAndLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%'
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding: '2%',
    fontSize: 20,
    // marginBottom: 10,
  },
  datePicker: {
    // marginBottom: 10,
  },
  picker: {
    width: '50%',
    // marginBottom: 10,
  },
  slider: {
    width: '100%',
    marginBottom: 10,
    color:'purple'
  },
  subtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
  },
  checkbox: {
    fontSize: 22,
    marginRight: 10,
  },
  deleteSubtask: {
    fontSize: 22,
    marginLeft: 10,
    color: 'red',
  },
  addSub: {
    fontSize: 10,
    flexDirection: 'row'
  },
  buttonContainer: {
      display: 'row'
      
  },
  addImg: {
    height:15,
    width:15,
    marginRight:10,
  }
  // Additional styles
});
export default FormComponent;