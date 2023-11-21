import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package
import { Calendar } from 'react-native-calendars'; // Make sure to install this package

export default function CalendarScreen() {
    // Dummy data for events
    const events = {
        today: [{ time: '18:00', title: 'Dinner with flat' }],
        tomorrow: [{ time: '15:00', title: 'Pilates' }]
    };

    return (
        <View style={styles.container}>
             <Calendar 
                markedDates={{ 
                    '2023-11-17': { selected: true, marked: true }, 
                    '2023-11-16': { marked: true, dotColor: 'purple' }, 
                    '2023-11-18': { 
                        marked: true, dotColor: 'purple', 
                        activeOpacity: 0 
                    }, 
                }} 
                theme={{ 
                    backgroundColor: '#ffffff', 
                    calendarBackground: '#ffffff', 
                    textSectionTitleColor: '#b6c1cd', 
                    selectedDayBackgroundColor: '#800080', 
                    selectedDayTextColor: '#ffffff', 
                    todayTextColor: '#00adf5', 
                    dayTextColor: '#2d4150', 
                    textDisabledColor: '#d9e1e8', 
                    dotColor: '#800080', 
                    selectedDotColor: '#800080', 
                    arrowColor: 'black', 
                    monthTextColor: '#00adf5', 
                    indicatorColor: 'black', 
                    textDayFontSize: 16, 
                    textMonthFontSize: 16, 
                    textDayHeaderFontSize: 16 
                }} 
            /> 
            <ScrollView style={styles.scrollView}>
                <View style={styles.eventGroup}>
                    <Text style={styles.eventGroupTitle}>Today</Text>
                    {events.today.map((event, index) => (
                        <View key={index} style={styles.event}>
                            <Text style={styles.eventTime}>{event.time}</Text>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.eventGroup}>
                    <Text style={styles.eventGroupTitle}>Tomorrow</Text>
                    {events.tomorrow.map((event, index) => (
                        <View key={index} style={styles.event}>
                            <Text style={styles.eventTime}>{event.time}</Text>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.fab} onPress={() => {}}>
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
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
        marginRight: 8,
    },
    eventTitle: {
        flex: 1,
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
});
