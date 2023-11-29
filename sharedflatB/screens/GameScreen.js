import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Modal } from 'react-native';
import { useMyNuts, useSetMyNuts, usePurchasedItems, useSetPurchasedItems, useHappiness, useSetHappiness} from '../context/TasksContext';


const GameScreen = () => {
  const [activeTab, setActiveTab] = useState('you');
  const nuts = useMyNuts(); // Use the current nuts value
  const setMyNuts = useSetMyNuts(); // Use the setter function to update nuts
  const purchasedItems = usePurchasedItems(); // Use the purchased items
  const setPurchasedItems = useSetPurchasedItems();
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
  const renderContent = () => {
    switch (activeTab) {
      case 'ranking':
        return <RankingView />;
      case 'shop':
        return <ShopView />;
      case 'you':
        return <YouView />;
      default:
        return <YouView />;
    }
  };
const squirrelHappiness= useHappiness();
const you = getSquirrelImage(purchasedItems);
const SetHappiness= useSetHappiness();
// Example data for the character images
const characters = [
  { id: '1', name: 'You', happiness: squirrelHappiness, image: you },
  { id: '2', name: 'Lara', happiness: '80', image: require('./Squirrels/lara.png') },
  { id: '3', name: 'Sara', happiness: '100', image: require('./Squirrels/Sara.png') },
  { id: '4', name: 'Lino', happiness: '10', image: require('./Squirrels/Lino.png') },
];
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

const RankingView = () => {
  // Sort characters by descending happiness level
  const sortedCharacters = [...characters].sort((a, b) => b.happiness - a.happiness);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Squirrel Ranking</Text>
      <FlatList
        scrollEnabled={false}
        data={sortedCharacters}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.rankingItem}>
            <Text style={styles.rankingText}>{index + 1}.</Text>
            <Text style={styles.rankingText}> {item.name}</Text>
            <Text style={[styles.rankingText, { color: getHappinessBarColor(item.happiness) }]}>
              {`${item.happiness}%`}
            </Text>
          </View>
        )}
      />
      <View style={styles.characterGrid}>
        {sortedCharacters.map((character, index) => (
          <View key={character.id} style={styles.characterContainer}>
            <Image source={character.image} style={styles.characterImage1} />
            <View style={styles.happinessBarContainer}>
              <View style={[
                styles.happinessBar,
                { width: `${character.happiness}%`, backgroundColor: getHappinessBarColor(character.happiness) }
              ]} />
            </View>
            <Text style={styles.characterName}>{`${index + 1}. ${character.name}`}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const ShopView = () => {
  const nutImage = require('./Shop/nut.png');
  const hygienePackets = [
    { id: '1', title: 'Perfume', price: 3, image: require('./Shop/perfume.png') },
    { id: '2', title: 'Fur Washing', price: 7, image: require('./Shop/soap.png') },
    { id: '3', title: 'New Hairstyle', price: 3, image: require('./Shop/haircut.png') },
    // ... other hygiene packet items
  ];

  const outfits = [
    { id: '4', title: 'I Love HCI Shirt', price: 10, image: require('./Shop/tshirt.png') },
    { id: '5', title: 'Princess Dress', price: 6, image: require('./Shop/dress.png') },
    { id: '6', title: 'Crown', price: 60, image: require('./Shop/crown.png') },
    // ... other outfit items
  ];
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handlePurchase = () => {
    if (nuts >= selectedItem.price) {
      setMyNuts((currentNuts) => currentNuts - selectedItem.price);
      setPurchasedItems((currentItems) => [...currentItems, selectedItem.id]);
    
        // Update happiness based on the item purchased
        switch(selectedItem.id) {
          case '1':
            SetHappiness((squirrelHappiness) => Math.min(100, squirrelHappiness + 3));
            break;
          case '2':
            SetHappiness((squirrelHappiness) =>  Math.min(100, squirrelHappiness + 7));
            break;
          case '3':
            SetHappiness((squirrelHappiness) =>  Math.min(100, squirrelHappiness + 3));
            break;
          case '4':
            SetHappiness((squirrelHappiness) =>  Math.min(100, squirrelHappiness + 10));
            break;
          case '5':
            SetHappiness((squirrelHappiness) =>  Math.min(100, squirrelHappiness + 6));
            break;
          case '6':
            SetHappiness((squirrelHappiness) =>  Math.min(100, squirrelHappiness + 60));
            break;
          default:
            break;
        }
    
        setModalVisible(false);
      } else {
        alert("You don't have enough nuts!");
      }
    };

  return (
    <>
      <ScrollView style={styles.shopContainer}>
        <Text style={styles.shopTitle}>Shop</Text>
        <Text style={styles.totalAmount}>Total: {nuts} <Image source={nutImage} style={styles.nutImage} /></Text>
        
        <Text style={styles.sectionTitle}>Hygiene Packets</Text>
        {/* Horizontal scroll view for hygiene packets */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
        {/* Make sure to bind handleItemClick with the correct item */}
        {hygienePackets.map((item) => (
          <TouchableOpacity key={item.id} style={styles.item} onPress={() => handleItemClick(item)}>
            <View key={item.id} style={styles.item}>
            <View style={styles.shopImageContainer}>
            <Image source={item.image} style={styles.shopImage} />
            </View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price} <Image source={nutImage} style={styles.nutImage} /></Text>
            </View>
          </TouchableOpacity>
        ))}
         </ScrollView>
         <Text style={styles.sectionTitle}>Outfits</Text>
          {/* Horizontal scroll view for outfits */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
          {outfits.map((item) => (
          <TouchableOpacity key={item.id} style={styles.item} onPress={() => handleItemClick(item)}>
             <View key={item.id} style={styles.item}>
                <View style={styles.shopImageContainer}>
                  <Image source={item.image} style={styles.shopImage} />
                </View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>{item.price} <Image source={nutImage} style={styles.nutImage} /></Text>
              </View>
          </TouchableOpacity>
        ))}
        </ScrollView> 
      </ScrollView>

      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to buy {selectedItem?.title} for {selectedItem?.price} nuts?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handlePurchase}
              >
                <Text style={styles.textStyle}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
const YouView = () => {
  const happinessMessage = squirrelHappiness >= 80 ? "Squiry is very happy!" :
                             squirrelHappiness >= 50 ? "Squiry is fine!" :
                             "Oh no! Squiry is unhappy!";
 
  return (
    <View style={styles.mainContent}>
    <Text style={styles.title}>Squiry</Text>
    <Text style={styles.subtitle}>{happinessMessage}</Text>
    <Text style={styles.description}>Buy him something nice in the shop</Text>
    <Image source={ you} style={styles.characterImage} />
    {/* Happiness Bar */}
    <View style={styles.happinessBarContainer}>
      <View style={[styles.happinessBar, { width: `${squirrelHappiness}%`, backgroundColor: getHappinessBarColor(squirrelHappiness) }]} />
    </View>
    <Text style={styles.happinessBarText}>Happiness bar</Text>
    {/* Action Button */}
    <TouchableOpacity style={styles.actionButton} onPress={() => setActiveTab('shop')}>
      <Text style={styles.actionButtonText}>Buy Something</Text>
    </TouchableOpacity>
  </View>
  );
};

  return (
    <View style={styles.container}>
      {/* Header Tabs */}
      <View style={styles.headerTabs}>
        <TouchableOpacity onPress={() => setActiveTab('ranking')} style={[styles.tab, activeTab === 'ranking' && styles.activeTab]}>
          <Text style={styles.tabText}>Ranking</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('shop')} style={[styles.tab, activeTab === 'shop' && styles.activeTab]}>
          <Text style={styles.tabText}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('you')} style={[styles.tab, activeTab === 'you' && styles.activeTab]}>
          <Text style={styles.tabText}>You</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#800080',
  },
  tab: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  tabText: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'purple',
  },
  tab: {
    color: 'white',
    paddingVertical: 10,
  },
  activeTab: {
    color: 'white',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'white', // Or any color that indicates active state
  },
  mainContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  tabContent: {
    flex: 1,
    padding: 10,
  },
  rankingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rankingText: {
    fontSize: 18,
  },
  characterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  characterContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    minWidth: 50
  },
  characterImage1: {
    width: 150, // Adjust based on your image's dimensions
    height: 150, // Adjust based on your image's dimensions
    resizeMode: 'contain',
  },
  characterName: {
    marginTop: 8,
  },
  shopContainer: {
    flex: 1,
    padding: 16,
  },
  shopTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 16,
    textAlign:'center'
  },
  shopImageContainer: {
    borderColor: 'black',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent:'center'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign:'center'
  },
  itemsContainer: {
    marginBottom: 15,
    flexDirection:'row',
    justifyContent:'center',
   
  },
  item: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemTitle: {
    textAlign:'center',
    fontSize: 15,
    paddingTop: 10
  },
  itemPrice: {
    textAlign: 'center',
  },
  nutImage: {
    width: 20, // Adjust based on your image's dimensions
    height: 20, // Adjust based on your image's dimensions
    resizeMode: 'contain',
  },
  shopImage: {
    width: 120, // Adjust based on your image's dimensions
    height: 120, // Adjust based on your image's dimensions
    resizeMode: 'contain',
  },
  youTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  characterImage: {
    width: 300, // Set as per your image's aspect ratio
    height: 300, // Set as per your image's aspect ratio
    resizeMode: 'contain',
  },
  happinessBarContainer: {
    width: '80%',
    height:20,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  happinessBar: {
    width: '40%',
    height: 18,
    backgroundColor: 'orange',
    borderRadius: 10,
  },
  happinessBarText: {
    textAlign: 'center',
    fontSize: 12,
  },
  actionButton: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
  },
  horizontalScrollView: {
    flexDirection: 'row', // This ensures children are laid out in a row
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonConfirm: {
    backgroundColor: "#F194FF",
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  // Add styles for content of each tab as per your design
});

export default GameScreen;


