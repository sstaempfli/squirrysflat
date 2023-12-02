import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTasks, usePurchasedItems, useHappiness } from '../context/TasksContext';

export default function DashboardScreen({ navigation }) {
    // Function to navigate to different screens
    const tasks = useTasks();

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
    const purchasedItems = usePurchasedItems(); 
    const squirrelHappiness=  useHappiness();
    const getRanking = (squirrelHappiness) => {
      if (squirrelHappiness < 10) {
        return 4;
      } else if (squirrelHappiness >= 10 && squirrelHappiness < 80) {
        return 3;
      } else if (squirrelHappiness >= 80 && squirrelHappiness < 100) {
        return 2;
      } else {
        return 1;
      }
    };
    function getSquirrelImage(purchasedItems) {
      if (purchasedItems.length === 0) {
        // Default image when no purchased items
        return require('../screens/Squirrels/you.png');
      }
      const lastPurchasedItemId = purchasedItems[purchasedItems.length - 1];
      // Map the last purchased item ID to the corresponding image
      switch (lastPurchasedItemId) {
        case '1':
          return require('../screens/You/perfume_you.png');
        case '2':
          return require('../screens/You/clean_you.png');
        case '3':
          return require('../screens/You/haircut_you.png');
        case '4':
          return require('../screens/You/hci_you.png');
        case '5':
          return require('../screens/You/dress_you.png');
        case '6':
          return require('../screens/You/crown_you.png');
        default:
          // Default image when the last purchased item is not recognized
          return require('../screens/Squirrels/you.png');
      }
    }
  const getHappinessBarColor = (happinessPercentage) => {
    const happiness = parseInt(happinessPercentage, 10); // Convert to integer for comparison
    if (happiness > 66) {
      return 'green';
    } else if (happiness > 33) {
      return 'orange';
    } else {
      return 'red';
    }
  };

    const getUpcomingEvents = () => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Resetting time to midnight
  
      const upcomingEvents = [];
  
      Object.keys(eventsByDate).forEach(date => {
          const eventDate = new Date(date);
          if (eventDate >= currentDate) {
              upcomingEvents.push(...eventsByDate[date].map(event => ({ ...event, date })));
          }
      });
  
      // Sorting by date
      upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      return upcomingEvents.slice(0, 3);
  };
  
  
  const UpcomingEventsPreview = () => {
    const upcomingEvents = getUpcomingEvents();

    return (
        <View style={styles.tasksListPreview}>
            {upcomingEvents.map((event, index) => (
                <View key={index} style={styles.eventItemContainer}>
                    <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
                    <Text style={styles.eventTime}>{event.time}</Text>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                </View>
            ))}
        </View>
    );
};

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
      <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity 
                style={styles.previewContainer} 
                onPress={() => navigateToScreen('TasksScreen')}
            >
               <Text style={styles.previewText}> Your Upcoming Tasks</Text>
        {/* Preview of the Tasks */}
        <View style={styles.tasksListPreview}>
          {tasks.filter((task) => task.assignedTo == "You").slice(0, 3).map((task, index) => (
            <View key={index} style={styles.taskPreview}>
              <Text style={styles.taskDueDate}>{formatDate(task.due)}</Text>
              <Text style={styles.taskTitle}>{task.name}</Text>
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
               <Text style={styles.previewText}> Your Upcoming Events</Text>
              
              
                    <UpcomingEventsPreview />
            </TouchableOpacity>

            
            <TouchableOpacity 
                style={styles.previewContainer} 
                onPress={() => navigateToScreen('GameScreen')}
            >
                <Image source={getSquirrelImage(purchasedItems)} style={styles.characterImage} />
                <View style={styles.happinessBarContainer}>
                <View style={[styles.happinessBar, { width: `${squirrelHappiness}%`, backgroundColor: getHappinessBarColor(squirrelHappiness) }]} />
                </View>
                <Text>{`${getRanking(squirrelHappiness)}. You`}</Text>
            </TouchableOpacity>
        </ScrollView>
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
        paddingBottom: 5
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
      height: 18,
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
    },
    eventItemContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd', 
  },
  eventDate: {
      width: 60, // adjust the width as needed
      marginRight: 8, // space between date and time
      fontSize: 14,
      color: '#666',
      textAlign: 'left', // ensures text is aligned to the start of the block
  },
  eventTime: {
      width: 50, // adjust the width as needed
      marginRight: 8, // space between time and title
      fontSize: 14,
      textAlign: 'left',
  },
  eventTitle: {
      fontSize: 14,
      textAlign: 'left',
      flex: 1, // takes the remaining space
      fontWeight: 'bold',
  },

});