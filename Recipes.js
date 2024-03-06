import React from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 StyleSheet,
 FlatList,
 Alert,
 Linking,
} from 'react-native';

const RecipeCard = ({ title, url, onPress }) => (
 <TouchableOpacity onPress={onPress}>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardUrl}>{url}</Text>
    </View>
 </TouchableOpacity>
);

const Recipes = ({ navigation }) => {
 const recipes = [
    { id: '1', name: 'French Omelette', image: 'https://www.seriouseats.com/classic-french-omelette-recipe' },
    { id: '2', name: 'Lasagna', image: 'https://www.spendwithpennies.com/easy-homemade-lasagna/' },
    { id: '3', name: 'Chicken Parmesan', image: 'https://cafedelites.com/crispy-chicken-parmesan/' },
    { id: '4', name: 'Chicken Noodle Soup', image: 'https://tastesbetterfromscratch.com/chicken-noodle-soup/' },
    { id: '5', name: 'Chicken Marsala', image: 'https://foodnetwork.co.uk/recipes/chicken-marsala-masala-peach-watermelon-rind-chutney' },
    { id: '6', name: 'Smoked Haddock Kedgeree', image: 'https://foodnetwork.co.uk/recipes/smoked-haddock-kedgeree' },
    { id: '7', name: 'Crayfish Salad', image: 'https://foodnetwork.co.uk/recipes/crayfish-salad-with-french-cocktail-sauce' },
    { id: '8', name: 'Mushroom and Aubergine Cannelloni', image: 'https://foodnetwork.co.uk/recipes/tom-kerridges-mushroom-and-aubergine-cannelloni' },
    { id: '9', name: 'Middle Eastern Style Chicken Legs', image: 'https://foodnetwork.co.uk/recipes/tom-kerridges-middle-eastern-style-chicken-legs' },
    { id: '10', name: 'Grilled Thai Curry Beef Roll', image: 'https://foodnetwork.co.uk/recipes/grilled-thai-curry-beef-roll' },
    { id: '11', name: 'Chicken and Pork Souvlaki', image: 'https://foodnetwork.co.uk/recipes/chicken-and-pork-souvlaki' },
    { id: '12', name: 'Daal Makhani', image: 'https://foodnetwork.co.uk/recipes/daal-makhani' },
    { id: '13', name: 'Tagine Chickpeas with Halloumi', image: 'https://foodnetwork.co.uk/recipes/tagine-chickpeas-with-halloumi' },
    { id: '14', name: 'Pan Fried Salmon', image: 'https://foodnetwork.co.uk/recipes/pan-fried-salmon' },
    { id: '15', name: 'Vietnamese Beef and Pork Pho', image: 'https://foodnetwork.co.uk/recipes/vietnamese-beef-and-pork-pho' },
    { id: '16', name: 'Chorizo and Potato Pressed Sandwich ', image: 'https://foodnetwork.co.uk/recipes/mexican-chorizo-and-potato-brick-pressed-sandwich' },
];

 const openUrl = async (url) => {
    // Opens the URL in a new page
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
 };

 const renderRecipe = ({ item }) => (
    <RecipeCard
      title={item.name}
      url={item.image}
      onPress={() => openUrl(item.image)}
    />
 );

 return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#ffcccb',
    paddingTop: 20,
 },
 title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
 },
 card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
 },
 cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
 },
 cardUrl: {
    fontSize: 14,
    color: 'grey',
 },
 button: {
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 30,
 },
 buttonText: {
    color: '#fff',
    fontSize: 16,
 },
});

export default Recipes;