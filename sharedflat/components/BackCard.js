import { Octicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react'
import { Alert, Modal, Pressable, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTasks, useTasksDispatch } from '../context/TasksContext'


export default function BackCard({ task }){
    const dispatch = useTasksDispatch();
    const tasks = useTasks();
    const [ editModalVisible, setEditModal ] = useState(false);
    return (
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setEditModal(!editModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/* 
                        
                        Add Edit Component here

                        Just add some text input for Name, Description, A slider for Nuts
                        maybe a dropdown for recurring tasks
                        and assigned to also a drop down

                        I ll connect the state afterwards (don t worry about the inital 
                        values in the inputs, i ll do that)

                        also add a submit button or smth like that, otherwise i can also 
                        make it dynamic, so no submit button is needed

                    */}
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setEditModal(!editModalVisible)}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
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
                <TouchableOpacity style={ styles.editCont } onPress={() => {
                    setEditModal(true);
                }}>
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        width: '80%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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