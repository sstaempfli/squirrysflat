import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function AddButton({ handlePress }){
    return(
        <TouchableOpacity style={{
            position: 'absolute',
            right: 30,
            bottom: 30,
            backgroundColor: 'purple',
            width: 56,
            height: 56,
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            shadowRadius: 5,
            shadowOpacity: 0.3,
            shadowColor: 'black',
            shadowOffset: { height: 2, width: 0 },
          }} onPress={() => {handlePress()}}>
            <Ionicons name="add" size={30} color="white" style={{
                paddingLeft: 2
            }} />
          </TouchableOpacity>
    )
}