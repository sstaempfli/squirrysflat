import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { useMyNuts } from '../context/TasksContext';


const GameScreen = () => {
  const [activeTab, setActiveTab] = useState('you');
  const nuts = useMyNuts()

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

// Example data for the character images
const characters = [
  { id: '1', name: 'You', happiness: '40', image: require('./Squirrels/you.png') },
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
    <View style={styles.container}>
      <Text style={styles.title}>Squirrel Ranking</Text>
      <FlatList
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
    </View>
  );
};

const ShopView = () => {
  const nutImage = require('./Shop/nut.png');

  return (
  <ScrollView style={styles.shopContainer}>
    <Text style={styles.shopTitle}>Shop</Text>
    <Text style={styles.totalAmount}>Total: {nuts} <Image source={nutImage} style={styles.nutImage} /> </Text>
    <Text style={styles.sectionTitle}>Hygiene Packets</Text>
    <View style={styles.itemsContainer}>
      {/* Each item in a row */}
      <View style={styles.item}>
        <View style={styles.shopImageContainer}>
          <Image source={require('./Shop/perfume.png')} style={styles.shopImage} />
        </View>
        <Text style={styles.itemTitle}>Perfume</Text>
        <Text style= {styles.itemPrice}>3 <Image source={nutImage} style={styles.nutImage} /> </Text>
      </View>
      <View style={styles.item}>
        <View style={styles.shopImageContainer}>
          <Image source={require('./Shop/soap.jpeg')} style={styles.shopImage} />
        </View>
        <Text style={styles.itemTitle}>Fur washing</Text>
        <Text style= {styles.itemPrice}>7 <Image source={nutImage} style={styles.nutImage} /> </Text>
      </View>
      <View style={styles.item}>
        <View style={styles.shopImageContainer}>
          <Image source={require('./Shop/haircut.jpeg')} style={styles.shopImage} />
        </View>
        <Text style={styles.itemTitle}>New Hairstyle</Text>
        <Text style= {styles.itemPrice}> 3 <Image source={nutImage} style={styles.nutImage} /> </Text>
      </View>
    </View>

    <Text style={styles.sectionTitle}>Outfits</Text>
    <View style={styles.itemsContainer}>
      {/* Each item in a row */}
      <View style={styles.item}>
      <View style={styles.shopImageContainer}>
        <Image source={require('./Shop/tshirt.png')} style={styles.shopImage} />
      </View>
        <Text style={styles.itemTitle}>I Love HCI Shirt</Text>
        <Text style= {styles.itemPrice}>10 <Image source={nutImage} style={styles.nutImage} /> </Text>
      </View>
      <View style={styles.item}>
      <View style={styles.shopImageContainer}>
        <Image source={require('./Shop/dress.png')} style={styles.shopImage} />
      </View>
        <Text style={styles.itemTitle}>Princess Dress</Text>
        <Text style= {styles.itemPrice}>6 <Image source={nutImage} style={styles.nutImage} /> </Text>
      </View>
      <View style={styles.item}>
      <View style={styles.shopImageContainer}>
        <Image source={require('./Shop/crown.png')} style={styles.shopImage} />
      </View>
        <Text style={styles.itemTitle}>The Crown</Text>
        <Text style= {styles.itemPrice}>60 <Image source={nutImage} style={styles.nutImage} /> </Text>
      </View>
    </View>
  </ScrollView>
)};


  const YouView = () => (
      <View style={styles.mainContent}>
        <Text style={styles.title}>Squiry</Text>
        <Text style={styles.subtitle}>Oh no! Squiry is unhappy!</Text>
        <Text style={styles.description}>Buy him something nice in the shop</Text>
        
        {/* Image Placeholder - Replace with actual Image tag and source */}
        <Image source={require('./Squirrels/you.png')} style={styles.characterImage} />

        {/* Happiness Bar */}
        <View style={styles.happinessBarContainer}>
          <View style={[styles.happinessBar, { width:'40%' }]} />
        </View>
        <Text style={styles.happinessBarText}>Happiness bar</Text>

        {/* Action Button */}
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Buy Something</Text>
        </TouchableOpacity>
      </View>
  );

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
    marginBottom: 20
  },
  characterContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  characterImage1: {
    width: 170, // Adjust based on your image's dimensions
    height: 170, // Adjust based on your image's dimensions
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
    justifyContent:'center'
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
  // Add styles for content of each tab as per your design
});

export default GameScreen;
