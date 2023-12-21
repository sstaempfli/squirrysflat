import { useEffect, useState } from "react";
import { Alert, Modal, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Avatar, Badge, Icon, withBadge, CheckBox } from '@rneui/themed';
import { Feather } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import FormComponent from "./FormComponent";
import { useTasksDispatch, useMyNuts, useSetMyNuts } from "../context/TasksContext";

const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

function simplifyDate(date){
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1)
    let txt;
    let badge;
  
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    const tomorrowYear = tomorrow.getFullYear();
    const tomorrowMonth = tomorrow.getMonth();
    const tomorrowDay = tomorrow.getDate();


    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth();
    const dateDay = date.getDate();

    if(dateDay == todayDay && dateYear == todayYear && dateMonth == todayMonth ){
        txt = "Today"
        badge = "error"
    }
    else if(dateDay == tomorrowDay && dateYear == tomorrowYear && dateMonth == tomorrowMonth){
        txt =  "Tomorrow"
        badge = "warning"
    }
    else{
        txt = formatDate(date);
        badge = "success"
    }
    return (
        <View style={{
            flex: 2,
            flexDirection: 'row-reverse',
            justifyContent: "center",
            alignItems: "flex-start",
        }}>
            <View style={{
                flexDirection: "row-reverse",
                alignItems: "center"
            }}>
                <Badge status={ badge } />
                <Text style={{
                    paddingRight: 5
                }}> 
                    Due { txt }
                </Text>
            </View>
            
        </View>
    )
}

export default function TaskCard({ task, activeRow, setActiveRow, isFormVisible, setIsFormVisible }) {
    const due = simplifyDate(task.due)
    const dispatch = useTasksDispatch();
    const myNuts = useMyNuts();
    const setMyNuts = useSetMyNuts();
    const [ editFormVisible, setEditFormVisible ] = useState(false)

    useEffect(() => {

    },[editFormVisible])

    const handleCloseForm = () => {
    // Logic to close the form
    setEditFormVisible(false);
    };
    
    function handleComplete(task) {
        if(task.assignedTo != "You"){
            Alert.alert("Whoopsy", "Are you really completing someone else's task? Are you sure you want to steal his nuts?", [
            {
                text: 'Cancel',
                onPress: () => {
                },
                style: 'cancel',
            },
            {text: 'Yes, stinky flatmate', onPress: () => {
                dispatch({type: 'delete', id: task.id})
                setMyNuts(myNuts + task.points)
            }}])
        }
        else if(task.assignedTo == "You"){
            dispatch({type: 'delete', id: task.id})
            setMyNuts(myNuts + task.points)
        }
    }
    const handleDelete = (task) => {
        Alert.alert("Delete Task", "Do you really want to delete this task?", [
        {
            text: 'Cancel',
            onPress: () => {
            },
            style: 'cancel',
        },
        {text: 'Yes', onPress: () => {
            dispatch({ type: 'delete', id: task.id})
        }}])
    }

    function handleSubmitForm(formData) {
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
        setEditFormVisible(false);
        dispatch({type: 'change', task: {
            ...formData,
            id: task.id,
            uri: uri,
            key: String(task.id)
        }})
    };

    if(task.id != activeRow){
        return (
            <View
                style={styles.card}
            >
                <View style={{
                    flex:1,
                    flexDirection: "row",
                }}>
                    <View style={styles.container}>
                        <Text style={{
                            flex: 1,
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingBottom: 5
                        }}>{task.name}</Text>
                        { due }
                    </View>
                    <View style={{
                        flex: 0.3,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: 45
                    }}>
                        <Avatar 
                            size={32}
                            rounded
                            source={{uri: task.uri}}
                        />
                        <Text style={{
                            padding: 5,
                            fontWeight: "400"
                        }}>
                            {task.assignedTo}
                        </Text>
                    </View>
                </View>
                
            </View>
        )
    }
    else{
        return (
            <View
                style={styles.bigger}
            >  
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editFormVisible}
                    >
                    <FormComponent
                        initialData={task}
                        onSubmit={handleSubmitForm}
                        onClose={handleCloseForm} 
                    />
                </Modal>
                <View style={styles.container}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <TouchableOpacity style={{
                            flex: 1
                        }} onPress={() => {handleComplete(task)}}>
                            <Octicons name="tasklist" size={28} color="purple"/>
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={{
                            flex: 3,
                            alignSelf: "center",
                            fontWeight: '500',
                            fontSize: 25
                        }}>{task.name}</Text>
                        <View style={{
                            flex: 1.5,
                            flexDirection: "row",
                            paddingLeft: '5%',
                        }}>
                            <TouchableOpacity style={{
                                flex: 1
                            }} onPress={() => {setEditFormVisible(true)}}>
                                <FontAwesome5 name="edit" size={28} color="purple"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flex: 1,
                            }} onPress={()=>{handleDelete(task)}}>
                                <FontAwesome5 name="trash-alt" size={28} color="red"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={{
                        flexDirection: "row",
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: '500',
                                paddingRight: 10,
                            }}>Assigned to:</Text>
                            <Avatar 
                                size={32}
                                rounded
                                source={{ uri: task.uri }}
                            />
                            <Text style={{
                                paddingHorizontal: 5,
                                fontWeight: "400"
                            }}>
                                {task.assignedTo}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            flex: 1,
                            alignItems: "center"
                        }}>
                            {due}
                        </View>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        height: 85
                    }}>
                        <View style={{
                            flex: 1,
                            width: '65%',
                            // height: '50%'
                        }}>
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 15,
                            }}>Description: </Text>
                            <Text style={{
                                fontWeight: '200',
                            }}>{task.description}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: "column"
                        }}> 
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}>
                                <Feather name="repeat" size={20} color="black" 
                                    style={{
                                        paddingRight: 10
                                    }}
                                />
                                
                                <Text>{task.repeat}</Text>
                            </View>
                            
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: 'flex-end',
                            }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: "row-reverse",
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: '400',
                                        paddingLeft: 5,
                                        
                                    }}>{task.points}</Text>
                                    <Image source={require('../screens/Shop/nut.png')}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    ></Image>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                    
                </View>   
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: "white",
      borderRadius: 10,
      marginVertical: 5,
      height: 100
    },
    bigger: {
      backgroundColor: "white",
      borderRadius: 10,
      marginVertical: 5,
      height: 200
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 10,
    },
  })