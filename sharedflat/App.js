import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from './screens/DashboardScreen';
import TasksScreen from './screens/TasksScreen';
import GameScreen from './screens/GameScreen';
import CalendarScreen from './screens/CalendarScreen';
import FinanceScreen from './screens/FinanceScreen';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { TasksProvider } from './context/TasksContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TasksProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Dashboard'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch(route.name){
                case "Dashboard":
                  iconName = "home"
                  break
                case "Finance":
                  iconName = "credit-card"
                  break
                case "Calendar":
                  iconName = "calendar"
                  return  <FontAwesome name={iconName} color={color} size={size} />
                case "Game":
                  iconName = "gamepad"
                  break
                case "Tasks":
                  iconName = "tasks"
                  break
              }
              return <FontAwesome5 name={iconName} color={color} size={size} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: "purple",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: [
              {
                "display": "flex",
              },
              null
            ]
          })}
        >
          <Tab.Screen name="Finance" component={FinanceScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Tasks" component={TasksScreen} />
          <Tab.Screen name="Game" component={GameScreen} />
        </Tab.Navigator>
      </NavigationContainer>  
    </TasksProvider>
  );
}
