import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import AddButton from '../components/AddButton';

const getDateString = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function CalendarScreen() {
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
        if (date === today) {
            acc[date].selected = true;
        }
        return acc;
    }, {});

    // State to manage the selected date and marked dates on the calendar
    const [selectedDate, setSelectedDate] = useState(today);
    const [markedDates, setMarkedDates] = useState(initialMarkedDates);

    // When a date is selected, update the selectedDate and markedDates state
    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        setMarkedDates({
            ...markedDates,
            [selectedDate]: { ...markedDates[selectedDate], selected: false }, // Deselect current date
            [day.dateString]: { ...markedDates[day.dateString], selected: true }, // Select new date
        });
    };

    return (
        <View style={styles.container}>
            <Calendar 
                markedDates={markedDates}
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
                textDayFontSize: 16, 
                textMonthFontSize: 25, 
                textDayHeaderFontSize: 15 
            }} 
                onDayPress={onDayPress}
            /> 
            <ScrollView style={styles.scrollView}>
                <View style={styles.eventGroup}>
                    {eventsByDate[selectedDate]?.length > 0 ? (
                        eventsByDate[selectedDate].map((event, index) => (
                            <View key={index} style={styles.event}>
                                <Text style={styles.eventTime}>{event.time}</Text>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noEventsText}>No events</Text>
                    )}
                </View>
            </ScrollView>
            <AddButton handlePress={() => {}}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    eventGroup: {
        padding: 16,
    },
    eventGroupTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    event: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    eventTime: {
        fontWeight: 'bold',
        marginRight: 20,
        fontSize: 18
    },
    eventTitle: {
        flex: 1,
        fontSize: 18
    },
    fab: {
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
    },
    noEventsText: {
      fontSize: 16,
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: 16,
  },
});
