import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from './screens/DashboardScreen';
import TasksScreen from './screens/TasksScreen';
import GameScreen from './screens/GameScreen';
import CalendarScreen from './screens/CalendarScreen';
import FinanceScreen from './screens/FinanceScreen';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TasksProvider } from './context/TasksContext';


const Stack = createStackNavigator();

function DashboardStackNavigator() {
  return (
    <Stack.Navigator>
       <Stack.Screen name="DashboardHome" component={DashboardScreen} options={{headerShown: false}} />
      <Stack.Screen name="TasksScreen" component={TasksScreen} />
      <Stack.Screen name="FinanceScreen" component={FinanceScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="GameScreen" component={GameScreen} />
    </Stack.Navigator>
  );
}

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
          <Tab.Screen name="Dashboard" component={DashboardStackNavigator} />
          <Tab.Screen name="Tasks" component={TasksScreen} />
          <Tab.Screen name="Game" component={GameScreen} />
        </Tab.Navigator>
      </NavigationContainer>  
    </TasksProvider>
  );
}
