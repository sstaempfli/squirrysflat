import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Avatar, Badge, Icon, withBadge, CheckBox } from '@rneui/themed';
import TaskCard from "../components/TaskCard";
import { Octicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import BackCard from "../components/BackCard";
import AddButton from "../components/AddButton";
import { useMyNuts, useSetMyNuts, useTasks, useTasksDispatch } from '../context/TasksContext'
import { FlatList } from "react-native-gesture-handler";

export default function TasksScreen() {
  let [activeRow, setActiveRow] = useState(-1);
  let [bool, setBool] = useState(true)
  const tasks = useTasks();
  const dispatch = useTasksDispatch();
  const setMyNuts = useSetMyNuts()
  const myNuts = useMyNuts()

  function completeTask(task, event, rowMap){
    if(event.value > Dimensions.get('window').width){
      if(bool && task.assignedTo != "You"){
        setBool(false)
        rowMap[task.key].closeRow()
        Alert.alert("Whoopsy", "Are you really completing someone else's task? Are you sure you want to steal his nuts?", [
          {
            text: 'Cancel',
            onPress: () => {
              setBool(true)
            },
            style: 'cancel',
          },
          {text: 'Yes, stinky flatmate', onPress: () => {
            dispatch({type: 'delete', id: task.id})
            setMyNuts(myNuts + task.points)
            setBool(true)
          }}])
      }
      else if(task.assignedTo == "You"){
        dispatch({type: 'delete', id: task.id})
        setMyNuts(myNuts + task.points)
      }
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
          data={tasks}
          renderItem={ (data, rowMap) => {
            return (
              <SwipeRow
                leftOpenValue={Dimensions.get('window').width}
                rightOpenValue={-(Dimensions.get('window').width/3.2)}
                // disableRightSwipe={true}
                // disableLeftSwipe={true}
                onSwipeValueChange={(event) => completeTask(data.item, event, rowMap)}
              >
                <BackCard task={ data.item }/>
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