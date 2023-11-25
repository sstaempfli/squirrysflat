import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, FlatList , Image} from 'react-native';
import  Slider  from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';


const FormComponent = ({ initialData, onSubmit, mode, onClose }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [subtasks, setSubtasks] = useState(
    initialData.subtasks.map(subtask => ({ title: subtask, checked: false }))
  );
  const [dueDate, setDueDate] = useState(new Date(initialData.dueDate || new Date()));
  const [repeat, setRepeat] = useState(initialData.repeat || 'Never');
  const [assignTo, setAssignTo] = useState(initialData.assignTo || 'Self');
  const [priority, setPriority] = useState(initialData.priority || 0);

  const handleSubtaskChange = (text, index) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = { ...newSubtasks[index], title: text };
    setSubtasks(newSubtasks);
  };

  const toggleSubtaskChecked = (index) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].checked = !newSubtasks[index].checked;
    setSubtasks(newSubtasks);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { title: '', checked: false }]);
  };

  const deleteSubtask = (index) => {
    const newSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(newSubtasks);
  };

  const handleSubmit = () => {
    const formData = {
      title,
      subtasks,
      dueDate,
      repeat,
      assignTo,
      priority,
    };
    onSubmit(formData);
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setDueDate(currentDate);
  };

  const renderSubtaskItem = ({ item, index }) => (
    <View style={styles.subtaskContainer}>
      <TouchableOpacity onPress={() => toggleSubtaskChecked(index)}>
        <Text style={styles.checkbox}>{item.checked ? '☑' : '☐'}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={`Subtask ${index + 1}`}
        value={item.title}
        onChangeText={(text) => handleSubtaskChange(text, index)}
      />
      <TouchableOpacity onPress={() => deleteSubtask(index)}>
        <FontAwesome5 name="trash-alt" size={20} color="black" marginLeft={10} />
      </TouchableOpacity>
    </View>
  );
 

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.fieldTitle}>Task Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.fieldTitle}>Subtasks</Text>
      <FlatList
        data={subtasks}
        renderItem={renderSubtaskItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
        <TouchableOpacity style={styles.addSub} onPress={addSubtask}>
          <Image source={require('../assets/add.png')} style={styles.addImg} /> 
          <Text style={{ color: 'purple' }}>Add Subtask</Text>
        </TouchableOpacity>}
        scrollEnabled={false} // Disable scrolling for the FlatList
      />

      <Text style={styles.fieldTitle}>Due Date</Text>
      <DateTimePicker
        value={dueDate}
        mode="date"
        display="default"
        onChange={handleDateChange}
        style={styles.datePicker}
      />

      <Text style={styles.fieldTitle}>Repeat</Text>
      <Picker
        selectedValue={repeat}
        style={styles.picker}
        onValueChange={(itemValue) => setRepeat(itemValue)}
      >
        {/* Picker Items */}
        <Picker.Item label="Never" value="Never" />
          <Picker.Item label="Daily" value="Daily" />
          <Picker.Item label="Weekly" value="Weekly" />
          <Picker.Item label="Monthly" value="Monthly" />
      </Picker>

      <Text style={styles.fieldTitle}>Assign To</Text>
      <Picker
        selectedValue={assignTo}
        style={styles.picker}
        onValueChange={(itemValue) => setAssignTo(itemValue)}
      >
        {/* Picker Items */}
        <Picker.Item label="You" value="You" />
        <Picker.Item label="Sara" value="Sara" />
        <Picker.Item label="Lara" value="Lara" />
        <Picker.Item label="Lino" value="Lino" />
      </Picker>

      <Text style={styles.fieldTitle}>Points</Text>
      <Slider
        style={styles.slider}
        value={priority}
        onValueChange={setPriority}
        minimumValue={0}
        maximumValue={10}
        step={1}
        minimumTrackTintColor='purple'
        maximumTrackTintColor='black'
        //thumbImage= {require('../assets/nut.png')} image too big don't know how to make it smaller
      />
      <View style={styles.buttonContainer}>
      <Button title='Done' onPress={handleSubmit} />
      <Button title='Cancel' onPress={onClose} />
      </View>
      
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  datePicker: {
    width: '100%',
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    marginBottom: 10,
    color:'purple'
  },
  subtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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