import { Octicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react'
import { Alert, Modal, Pressable, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTasks, useTasksDispatch } from '../context/TasksContext'
import FormComponent from './FormComponent';



export default function BackCard({ task }){
    const dispatch = useTasksDispatch();
   // const [ editModalVisible, setEditModal ] = useState(false); i switched it to isFormVisible

    const [isFormVisible, setIsFormVisible] = useState(false);
    // const [formMode, setFormMode] = useState('edit'); // 'create' or 'edit'
    // const [initialData, setInitialData] = useState({}); // Data for editing
    
    // const dummyInitialData = {
    //     title: 'Grocery Shopping',
    //     subtasks: ['Buy milk', 'Buy bread', 'Get apples'],
    //     dueDate: '2023-04-15',
    //     repeat: 'Weekly',
    //     assignTo: 'Self',
    //     priority: 5,
    //   };
    // const handleOpenForm = (mode, data = {}) => {
    //     setFormMode(mode);
    //     setInitialData(data);
    //     setIsFormVisible(true);
    // };
    
    // const handleEditTask = () => {
    //     // handleOpenForm('edit', dummyInitialData);
    // };

    const handleCloseForm = () => {
    // Logic to close the form
        setIsFormVisible(false);
    };

    const handleSubmitForm = (formData) => {
    // Handle form submission logic here
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
        setIsFormVisible(false);
        dispatch({type: 'change', task: {
            ...formData,
            id: task.id,
            uri: uri,
            key: String(task.id)
        }})
    };
    return (
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={isFormVisible}
            // onRequestClose={() => setIsFormVisible(false)}
            >
            <FormComponent
            initialData={task}
            onSubmit={handleSubmitForm}
            onClose={handleCloseForm} 
            />
        </Modal>
        <View style={styles.rowBack}>
            <View style={{
                flex: 2,
                paddingLeft: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Octicons name="tasklist" size={30} color="white"
                />
                <Text style={{
                    fontWeight: '500',
                    color: "white",
                    paddingLeft: 5
                }}>Complete</Text>
            </View>
            <View style={ styles.editDeleteCont }>
                <TouchableOpacity style={ styles.editCont } onPress={() => setIsFormVisible(true)}>
                    <View >
                        <FontAwesome5 name="edit" size={28} color="white"/>
                    </View >
                </TouchableOpacity>
                
                <View style={styles.deleteCont}>
                    <TouchableOpacity style={styles.opacity}
                        onPress={() => {
                            dispatch({type: 'delete', id: task.id})
                        }}
                    >
                        <FontAwesome5 name="trash-alt" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    opacity: {
        height:100,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    editCont: {
        flex: 1,
        height: 100,
        alignItems:"center",
        flexDirection: "column",
        justifyContent: "center"
    },
    editDeleteCont: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        height: 100,
    },
    deleteCont: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems:"center",
        height: 100,
    },
    rowBack: {
        flexDirection: "row",
        backgroundColor: "purple",
        borderRadius: 10,
        height: 100,
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
  })