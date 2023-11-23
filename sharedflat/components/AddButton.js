import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function AddButton({ handlePress }){
    return(
        <TouchableOpacity style={{
            position: 'absolute',
            right: 16,
            bottom: 16,
            backgroundColor: 'purple',
            borderRadius: 28,
            width: 56,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4,
            shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 2 },
          }} onPress={() => {handlePress()}}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
    )
}