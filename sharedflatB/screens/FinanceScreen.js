import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import AddButton from '../components/AddButton';

const FinanceScreen = () => {
  const [activeTab, setActiveTab] = useState('byYou');
  const [activeView, setActiveView] = useState('overall');
  const [selectedPayment, setSelectedPayment] = useState(null); 

  // Dummy data for payments and total amounts
  const payments = [
    { id: '1', category: 'Groceries', amount: '15.00 CHF', date: '19.10.2023 20:00', paidBy: 'You', sharedWith: ['Lara', 'Lino'] },
    { id: '2', category: 'Laundry', amount: '8.00 CHF', date: '10.10.2023 15:00', paidBy: 'You', sharedWith: ['Lara', 'Lino', 'Sara'] },
    { id: '3', category: 'Groceries', amount: '30.00 CHF', date: '22.10.2023 16:00', paidBy: 'Lino', sharedWith: ['You', 'Sara', 'Lino'] },
    { id: '4', category: 'Toiletries', amount: '16.00 CHF', date: '23.10.2023 18:00', paidBy: 'Lara', sharedWith: ['Sara'] }
  ];

  const recurringpayments = [
    { id: '1', category: 'Rent', amount: '2500.00 CHF', date: '01.10.2023 10:00',  paidBy: 'You', sharedWith: ['Lara', 'Lino', 'Sara'], recurring: 'monthly' },
    { id: '2', category: 'Wifi', amount: '50.00 CHF', date: '1.10.2023 10:00',  paidBy: 'Lara', sharedWith: ['You', 'Lino', 'Sara'], recurring: 'monthly' }
  ]
  
  const handleSelectPayment = (payment) => {
    setSelectedPayment(payment);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedPayment(null);
  }
  const PaymentDetailsModal = ({ payment }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!payment}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Payment Details:</Text>
          <Text>Category: {payment.category}</Text>
          <Text>Amount: {payment.amount}</Text>
          <Text>Date: {payment.date}</Text>
          <Text>Paid by: {payment.paidBy}</Text>
          <Text>Shared with: {payment.sharedWith.join(', ')}</Text>
          <TouchableOpacity style={styles.buttonClose} onPress={handleCloseModal}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderPaymentsList = () => {
    const data = activeView === 'overall' ? payments : recurringpayments;
  
    // Adjusted filter logic
    return (
      <FlatList
        data={data.filter(payment => {
          switch (activeTab) {
            case 'byYou':
              return payment.paidBy === 'You';
            case 'withYou':
              return payment.sharedWith && payment.sharedWith.includes('You');
            default:
              return true; // 'all' tab selected, no filter applied
          }
        })}
        renderItem={renderPayment}
        keyExtractor={item => item.id}
      />
    );
  };
  const amounts = {
    overall: '+ 0.00 CHF',
  };
  const renderPayment = ({ item }) => (
    <TouchableOpacity style={styles.paymentItem} onPress={() => handleSelectPayment(item)}>
      <View style={styles.paymentTextContainer}>
        <Text style={styles.paymentCategory}>{item.category}</Text>
        <Text style={styles.paymentAmount}>{item.amount}</Text>
        <Text style={styles.paymentDate}>{item.date}</Text>
        {item.recurring && <Text style={styles.paymentRecurring}>Recurring: {item.recurring}</Text>}
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="purple" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Toggle between Overall and Recurring views */}
      <View style={styles.toggleButtons}>
        <TouchableOpacity 
          style={[styles.toggleButton, activeView === 'overall' && styles.activeButton]}
          onPress={() => setActiveView('overall')}
        >
          <Text style={styles.toggleButtonText}>Overall</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, activeView === 'recurring' && styles.activeButton]}
          onPress={() => setActiveView('recurring')}
        >
          <Text style={styles.toggleButtonText}>Recurring</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional rendering for Total Amount only in Overall view */}
      {activeView === 'overall' && (
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountText}>Total Amount:</Text>
          <Text style={styles.amountValue}>{amounts[activeView]}</Text>
          <Text style={styles.totalAmountText}>You do not owe anyone</Text>
        </View>
      )}

      {/* Payments Tabs */}
      <View style={styles.paymentsContainer}>
          <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('byYou')} style={[styles.tab, activeTab === 'byYou' && styles.activeTab]}>
            <Text style={styles.tabText}>By you</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('withYou')} style={[styles.tab, activeTab === 'withYou' && styles.activeTab]}>
            <Text style={styles.tabText}>With you</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('all')} style={[styles.tab, activeTab === 'all' && styles.activeTab]}>
            <Text style={styles.tabText}>All</Text>
          </TouchableOpacity>
          </View> 
          {renderPaymentsList()}
      </View>
     

      {/* Add Button */}
      <AddButton handlePress={() => {}}/>
      {selectedPayment && <PaymentDetailsModal payment={selectedPayment} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //paddingTop: 10
  },
  totalAmountContainer: {
    backgroundColor: 'purple',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  paymentsText:{
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    paddingTop: 10,
    color: 'purple'
  },
  toggleButtons: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
  },
  activeButton: {
    backgroundColor: 'white',
  },
  toggleButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
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
  paymentsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    borderColor: 'purple',
  },
  tabText: {
    color: 'black',
    fontSize: 16,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  paymentTextContainer: {
    flex: 1,
  },
  paymentCategory: {
    fontSize: 16,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
  },
  paymentDate: {
    fontSize: 12,
    color: 'grey',
  },
  addButton: {
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }, 
  paymentRecurring: {
    fontStyle: 'italic',
    color: 'grey',
  }
});

export default FinanceScreen;

