import { useState } from "react";
import { FlatList, View, Text, Dimensions, Alert, Modal } from "react-native";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import TaskCard from "../components/TaskCard";
import BackCard from "../components/BackCard";
import AddButton from "../components/AddButton";
import FormComponent from "../components/FormComponent";
import { useMyNuts, useSetMyNuts, useTasks, useTasksDispatch } from '../context/TasksContext'

export default function TasksScreen() {
  let [activeRow, setActiveRow] = useState(-1);
  let [bool, setBool] = useState(true)
  const tasks = useTasks();
  const dispatch = useTasksDispatch();
  const setMyNuts = useSetMyNuts()
  const myNuts = useMyNuts()
  const [isFormVisible, setIsFormVisible] = useState(false);
  let [currentId, setCurrentId] = useState(4)

  const sortedTasks = [...tasks].sort((a, b) => {
    return new Date(a.due) - new Date(b.due);
  })

  function handleAdd(formData) {
    let uri
    switch(formData.assignedTo){
      case 'Lino':
        uri = "https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg"
        break
      case 'Lara':
        uri = "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg"
        break
      case "Sara":
        uri = "https://imageio.forbes.com/specials-images/imageserve/64e8c95bf02f344e0cd8ae1f/Former-President-Donald-Trump-Surrenders-To-Fulton-County-Jail-In-Election-Case/0x0.jpg?crop=1500,1120,x0,y185,safe&height=530&width=711&fit=bounds"
        break
      case "You":
        uri = "https://cdn.icon-icons.com/icons2/2716/PNG/512/user_circle_icon_172814.png"
        break
      default: 
        uri = "https://cdn.icon-icons.com/icons2/2716/PNG/512/user_circle_icon_172814.png"
    }
    setCurrentId(currentId + 1)
    setIsFormVisible(false)
    dispatch({type: 'add', task: { 
      ...formData,
      id: currentId,
      uri: uri,
      key: String(currentId)}})
  }

  return (
    <>
      <Modal
          animationType="slide"
          transparent={true}
          visible={isFormVisible}
          >
          <FormComponent
            initialData={{
              key: currentId.toString(),
              id: currentId,
              name: '',
              description: "",
              assignedTo: "You",
              due: new Date(),
              points: 1,
              repeat: "Daily",
              uri: "https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg"
            }}
            onSubmit={handleAdd}
            onClose={() => setIsFormVisible(false)} 
          />
      </Modal>
      <FlatList
          style={{
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
          data={sortedTasks}
          renderItem={ (data) => {
            let rowRef = null;

            return (
              <SwipeRow
                leftOpenValue={Dimensions.get('window').width}
                rightOpenValue={-(Dimensions.get('window').width/3.2)}
                disableRightSwipe={true}
                disableLeftSwipe={true}
                ref={(ref) => rowRef = ref}
                onRowPress={() => {
                  activeRow != data.item.id ? setActiveRow(data.item.id) : setActiveRow(-1)
                }}
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
      <AddButton handlePress={() => setIsFormVisible(true)}/>
    </>
    
  );
}