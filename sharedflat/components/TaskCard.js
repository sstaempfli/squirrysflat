import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Badge, Icon, withBadge, CheckBox } from '@rneui/themed';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

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
        txt = String(date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear())
        badge = "success"
    }
    return (
        <View style={{
            // flex:1,
            flexDirection: 'row',
            // justifyContent: "center",
            alignItems: "center",
        }}>
            <Badge status={ badge } />
            <Text style={{
                paddingLeft: 5
            }}> 
                Due { txt }
            </Text>
        </View>
    )
}

export default function TaskCard({ task, activeRow, setActiveRow }) {
    const due = simplifyDate(task.due)
    if(task.id != activeRow){
        return (
            <TouchableOpacity
                onLongPress={() => setActiveRow(task.id)}
                activeOpacity={1}
                style={styles.card}
            >
                <View style={{
                    flex:1,
                    flexDirection: "row",
                }}>
                    <View style={styles.container}>
                        <View>
                        </View>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold'
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
                
            </TouchableOpacity>
        )
    }
    else{
        return (
            <TouchableOpacity
                onLongPress={() => setActiveRow(-1)}
                style={styles.bigger}
                activeOpacity={1}
            >  
                <View style={styles.container}>
                    <Text style={{
                        alignSelf: "center",
                        fontWeight: '500',
                        fontSize: 30
                    }}>{task.name}</Text>
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
                                source={{uri: task.uri}}
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
                            flex: 1
                        }}>
                            {due}
                        </View>
                    </View>
                        
                    <View>
                        <Text style={{
                            fontWeight: '500',
                            fontSize: 15,
                        }}>Description: </Text>
                        <Text style={{
                            fontWeight: '200'
                        }}>{task.description}</Text>
                    </View>
                    
                </View>   
            </TouchableOpacity>
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
        alignItems: 'left',
        padding: 10,
    },
  })