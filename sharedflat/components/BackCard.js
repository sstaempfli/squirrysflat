import { Octicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";


export default function BackCard(){
    return (
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
                <TouchableOpacity style={ styles.editCont }>
                    <View >
                        <FontAwesome5 name="edit" size={28} color="white"/>
                    </View >
                </TouchableOpacity>
                
                <View style={styles.deleteCont}>
                    <TouchableOpacity style={styles.opacity}>
                        <FontAwesome5 name="trash-alt" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
  })