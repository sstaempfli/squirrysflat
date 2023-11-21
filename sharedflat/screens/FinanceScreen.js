import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package

export default function FinanceScreen() {
    // Dummy data for payments
    const payments = [
        { category: 'Groceries', amount: '15.00 CHF', date: '19.10.2023 20:00' },
        { category: 'Laundry', amount: '8.00 CHF', date: '10.10.2023 15:00' },
        // ... add more payments here
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Finances</Text>
            <View style={styles.segmentedControl}>
                <TouchableOpacity style={styles.segmentButton}>
                    <Text style={styles.segmentText}>Overall</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.segmentButton}>
                    <Text style={styles.segmentText}>Regular</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.summaryCard}>
                <Text style={styles.summaryText}>Total Amount:</Text>
                <Text style={styles.amountText}>+ 5.00 CHF</Text>
                <Ionicons name="arrow-forward" size={24} color="black" />
            </View>
            <ScrollView style={styles.scrollView}>
                {payments.map((payment, index) => (
                    <View key={index} style={styles.paymentItem}>
                        <Text style={styles.paymentCategory}>{payment.category}</Text>
                        <Text style={styles.paymentAmount}>{payment.amount}</Text>
                        <Text style={styles.paymentDate}>{payment.date}</Text>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                    </View>
                ))}
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
        backgroundColor: 'purple',
        color: 'white',
    },
    segmentedControl: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 8,
        backgroundColor: 'purple',
    },
    segmentButton: {
        padding: 8,
        backgroundColor: 'lightgrey', // Adjust color to match the design
    },
    segmentText: {
        color: 'white',
    },
    summaryCard: {
        margin: 16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: 'purple',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryText: {
        color: 'white',
        fontSize: 16,
    },
    amountText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    paymentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    paymentCategory: {
        color: 'black',
    },
    paymentAmount: {
        color: 'black',
        fontWeight: 'bold',
    },
    paymentDate: {
        color: 'grey',
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
