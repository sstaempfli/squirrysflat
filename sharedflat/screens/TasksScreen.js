import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Avatar, Badge, Icon, withBadge, CheckBox } from '@rneui/themed';
import TaskCard from "../components/TaskCard";
import { Octicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import BackCard from "../components/BackCard";
import AddButton from "../components/AddButton";

let today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const anotherDay = new Date(today);
anotherDay.setDate(anotherDay.getDate() + 5);

let initialTasks = [
  {
      id: 1, 
      name: 'Vaccum', 
      description: "Very cool task", 
      assignedTo: "Bob",
      due: today,
      uri: "https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg"
  },
  {
      id: 2,
      name: 'Wash Dishes',
      description: "Very cool task",
      assignedTo: "Bob",
      due: new Date(tomorrow),
      uri: "https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg"
  },
  { 
      id: 3,
      name: 'Cook for friends', 
      description: "Very cool task",
      assignedTo: "Me",
      due: new Date(anotherDay),
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDt6YUZ8byMEXMW-FqLnk72EfrpTC-hcBKjQ&usqp=CAU"
  }
];


export default function TasksScreen() {
  let [activeRow, setActiveRow] = useState(-1);

  function completeTask(id, event){
    if(event.value >= Dimensions.get('window').width){
      initialTasks = initialTasks.filter((row) => row.id != id)
      setActiveRow(activeRow - 1)
    }
  }

  return (
    <>
      <Text style={{
        alignSelf: "center",
        fontWeight: '100',
        paddingTop: 20
      }}>Swipe right to complete</Text>
      <SwipeListView
          style={{
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
          data={initialTasks}
          renderItem={ (data, rowMap) => {
            return (
              <SwipeRow
                leftOpenValue={Dimensions.get('window').width}
                rightOpenValue={-(Dimensions.get('window').width/3.2)}
                // leftActivationValue={100}
                // rightActivationValue={-50}
                disableRightSwipe={data.item.id == activeRow}
                disableLeftSwipe={data.item.id == activeRow}
                onSwipeValueChange={(event) => completeTask(data.item.id, event)}
              >
                <BackCard />
                <TaskCard
                  task={data.item}
                  activeRow={activeRow}
                  setActiveRow={setActiveRow}
                />
              </SwipeRow>
            )
          }}

      />
      <AddButton handlePress={() => {}}/>
    </>
    
  );
}