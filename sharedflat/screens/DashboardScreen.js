import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState} from 'react';

export default function DashboardScreen({ navigation }) {
    // Function to navigate to different screens
    const navigateToScreen = (screenName) => {
      let routeName = '';
    
      switch (screenName) {
        case 'TasksScreen':
          routeName = 'Tasks'; // The name of the tab as defined in your Tab.Navigator
          break;
        case 'FinanceScreen':
          routeName = 'Finance'; // The name of the tab as defined in your Tab.Navigator
          break;
        case 'CalendarScreen':
          routeName = 'Calendar'; // The name of the tab as defined in your Tab.Navigator
          break;
        case 'GameScreen':
          routeName = 'Game'; // The name of the tab as defined in your Tab.Navigator
          break;
        default:
          routeName = screenName; // Default case if the screenName matches the tab name
      }
    
      navigation.navigate(routeName);
    };
    const getDateString = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const today = getDateString(new Date());
    const tomorrow = getDateString(new Date(Date.now() + 86400000));

    // Dummy data for events, indexed by date
    const eventsByDate = {
        [today]: [{ time: '18:00', title: 'Dinner with flat' }],
        [tomorrow]: [{ time: '15:00', title: 'Pilates' }],
        ['2023-11-27']: [{time:'', title: 'Bob\'s Birthday'}],
        ['2023-11-30']: [{time:'13:00', title: 'Lunch with Alice'}],
        ['2023-12-05']: [{time:'16:00', title: 'Hairdresser'}],
        ['2023-12-15']: [{time:'20:00', title: 'Movie Night'}]
        // Add more events for different dates as needed
    };

    // Initialize marked dates with events
    const initialMarkedDates = Object.keys(eventsByDate).reduce((acc, date) => {
        acc[date] = { marked: true, dotColor: 'purple' };
        return acc;
    }, {});

    const [markedDates, setMarkedDates] = useState(initialMarkedDates);

    const yourTasks = [
      { dueDate: '2023-12-4', title:'Vacuum Cleaning', responsible: 'You'},
      { dueDate: '2023-12-8', title:'Taking Trash out', responsible: 'You'},
      { dueDate: '2023-12-12', title:'Cleaning Kitchen', responsible: 'You'},
      { dueDate: '2023-12-19', title:'Waterin plants', responsible: 'You'},
    ];
    const formatDate = (dateString) => {
      const options = { month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.previewContainer} 
                onPress={() => navigateToScreen('TasksScreen')}
            >
               <Text style={styles.previewText}> Your Tasks</Text>
        {/* Preview of the Tasks */}
        <View style={styles.tasksListPreview}>
          {yourTasks.slice(0, 3).map((task, index) => (
            <View key={index} style={styles.taskPreview}>
              <Text style={styles.taskDueDate}>{formatDate(task.dueDate)}</Text>
              <Text style={styles.taskTitle}>{task.title}</Text>
            </View>
          ))}
        </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.previewContainer} 
                onPress={() => navigateToScreen('FinanceScreen')}
            >
                <View style={styles.totalAmountContainer}>
                  <Text style={styles.totalAmountText}>Total Amount:</Text>
                  <Text style={styles.amountValue}>+ 0.00 CHF</Text>
                  <Text style={styles.totalAmountText}>You do not owe anyone</Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.previewContainer} 
                onPress={() => navigateToScreen('CalendarScreen')}
            >
              <View style={styles.calendarContainer} >
              <Calendar 
                // Set marking type to period
                markingType={'period'} 
                markedDates= {markedDates}
                theme={{  
                backgroundColor: '#ffffff', 
                calendarBackground: '#ffffff', 
                textSectionTitleColor: '#b6c1cd', 
                selectedDayBackgroundColor: '#800080', 
                selectedDayTextColor: '#ffffff', 
                todayTextColor: 'purple', 
                dayTextColor: '#2d4150', 
                textDisabledColor: '#d9e1e8', 
                dotColor: '#800080', 
                selectedDotColor: '#800080', 
                arrowColor: 'black', 
                monthTextColor: 'purple', 
                indicatorColor: 'black', 
                textDayFontSize: 10, 
                textMonthFontSize: 13, 
                textDayHeaderFontSize: 10
            }} 
            disableMonthChange={true}
            // Hide arrows
            hideArrows={true}
            // Hide day names
            hideDayNames={true}
            // Do not show the month in header
            showMonthText={false}
            // Prevent navigating to other screens
            disableAllTouchEventsForDisabledDays={true}
            // Only allow navigating within the current week
            enableSwipeMonths={false}
            /> 
              </View>
              
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.previewContainer} 
                onPress={() => navigateToScreen('GameScreen')}
            >
                <Image source={require('./Squirrels/you.png')} style={styles.characterImage} />
                <View style={styles.happinessBarContainer}>
                  <View style={styles.happinessBar} />
                </View>
                <Text>3. You</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-evenly', // This will distribute space evenly
    alignItems: 'center',
    flexDirection: 'column', // Items are laid out vertically
    backgroundColor: 'white',
},
previewContainer: {
    width: '90%', 
    maxHeight: 290,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'purple',
    borderWidth: 1,
    marginVertical: 20
},
    previewText: {
        fontSize: 18,
        fontWeight: 'bold',
        // Add more styles as needed
    },
    characterImage: {
      width: 130, // Set as per your image's aspect ratio
      height: 130, // Set as per your image's aspect ratio
      resizeMode: 'contain',
    },
    happinessBarContainer: {
      width: 100,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 10,
      height:20
    },
    happinessBar: {
      width: '40%',
      height: 18,
      backgroundColor: 'orange',
      borderRadius: 10,
    },
    calendarContainer:{
      padding: 2
    },
    totalAmountText: {
      color: 'white',
      fontSize: 16,
      marginBottom: 8,
    },
    amountValue: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    totalAmountContainer: {
      width:'100%',
      backgroundColor: 'purple',
      borderRadius: 10,
      alignItems: 'center',
    },
    tasksListPreview: {
      // Style for the container of the tasks preview
      alignSelf: 'stretch',
    },
    taskPreview: {
      // Style for each task preview
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd', // Light grey border for each task
    },
    taskDueDate: {
      // Style for the due date
      fontSize: 14,
      color: '#666', // Grey text color for due date
    },
    taskTitle: {
      // Style for the task title
      fontSize: 14,
      fontWeight: 'bold',
    }
});