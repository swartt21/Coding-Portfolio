import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MealPlanning = () => {
 const navigation = useNavigation();

 const meals = [
    { id: '1', name: 'French Omelette', image: 'https://www.seriouseats.com/thmb/e7nTQdeu7na1iYMHJOelq1Wud9w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__04__20160323-french-omelet-vicky-wasik--29-4443fd8d1f5b4e359f31e384d901cefb.jpg', nutritionInfo: 'Calories: 322kcal Carbohydrates: 1g    Protein: 19g                      Fat: 26g' },
    { id: '2', name: 'Lasagna', image: 'https://www.spendwithpennies.com/wp-content/uploads/2022/12/1200-Lasagna-SpendWithPennies-24-1.jpeg', nutritionInfo: 'Calories: 377kcal Carbohydrates: 28g  Protein: 29g                      Fat: 16g' },
    { id: '3', name: 'Chicken Parmesan', image: 'https://cafedelites.com/wp-content/uploads/2018/04/Chicken-Parmigiana-IMAGE-2-1365x2048.jpg', nutritionInfo: 'Calories: 560kcal Carbohydrates: 25g  Protein: 31g                       Fat: 36g' },
    { id: '4', name: 'Chicken Noodle Soup', image: 'https://tastesbetterfromscratch.com/wp-content/uploads/2017/10/Chicken-Noodle-Soup-2-500x500.jpg', nutritionInfo: 'Calories: 206kcal Carbohydrates: 14g  Protein: 23g                      Fat: 6g' },
    { id: '5', name: 'Chicken Marsala', image: 'https://images.food52.com/AIj73BDlj_323CK4fxGBtvCMS-Y=/1536x1022/filters:format(webp)/4e00b4a5-0a01-4d43-af59-aa9197e659fc--chicken_marsala.png', nutritionInfo: 'Calories: 356kcal Carbohydrates: 8g    Protein: 15g                        Fat: 27g' },
    { id: '6', name: 'Smoked Haddock Kedgeree', image: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/20072/responsive-images/foodnetwork-image-6301bbac-fe9d-4591-b3c2-50feb006b3fa___default_382_287.jpg', nutritionInfo: 'Calories: 549kcal Carbohydrates: 80g  Protein: 26g                      Fat: 18g' },
    { id: '7', name: 'Crayfish Salad', image: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/22533/responsive-images/foodnetwork-image-319b8a56-58f1-48cc-8191-062a0136ed1e___default_1215_911.jpg', nutritionInfo: '' },
    { id: '8', name: 'Mushroom and Aubergine Cannelloni', image: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/22510/responsive-images/foodnetwork-image-9c444afa-80dc-45d5-bf33-099432f6df46___default_756_567.jpeg', nutritionInfo: 'Calories: 2058kcal Carbohydrates: 201g  Protein: 108g                      Fat: 92g' },
    { id: '9', name: 'Middle Eastern Style Chicken Legs', image: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/22502/responsive-images/foodnetwork-image-7a4c9298-dd5d-460d-a745-6bc5db901f44___default_756_567.jpeg', nutritionInfo: 'Calories: 392kcal Carbohydrates: 7g    Protein: 23g                      Fat: 30g' },
    { id: '10', name: 'Grilled Thai Curry Beef Roll', image: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/15748/responsive-images/foodnetwork-image-ef8e9e3f-3fd2-4420-81b3-63fc5440bde6___default_826_619.jpeg', nutritionInfo: 'Calories: 330kcal Carbohydrates: 34g  Protein: 23g                      Fat: 11g' },
    { id: '11', name: 'Chicken and Pork Souvlaki', image: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/12924/responsive-images/foodnetwork-image-4e8f1f0e-a54b-45cb-acc6-b4b2f693a6d4___default_826_619.jpeg', nutritionInfo: 'Calories: 427kcal Carbohydrates: 30g    Protein: 16g                      Fat: 24g' },
    { id: '12', name: 'Daal Makhani', image: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/14282/responsive-images/foodnetwork-image-951c59dc-f591-4596-9785-32b2955beab8___default_572_429.jpeg', nutritionInfo: 'Calories: 330kcal Carbohydrates: 34g  Protein: 23g                      Fat: 11g' },
    { id: '13', name: 'Tagine Chickpeas with Halloumi', image: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/21013/responsive-images/foodnetwork-image-edebe18c-03be-4dc6-82de-e49bb542b19c___default_572_429.jpeg', nutritionInfo: 'Calories: 187kcal Carbohydrates: 24g  Protein: 8g                        Fat: 4g' },
    { id: '14', name: 'Pan Fried Salmon', image: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/17882/responsive-images/foodnetwork-image-3553741b-911d-4d99-bfd2-df31a0e1cc1e___default_572_429.png', nutritionInfo: 'Calories: 371kcal Carbohydrates: 0g    Protein: 34g                      Fat: 25g' },
    { id: '15', name: 'Vietnamese Beef and Pork Pho', image: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/12418/responsive-images/foodnetwork-image-474eb110-f0e8-4baf-934c-98782cfae2b2___default_572_429.jpeg', nutritionInfo: 'Calories: 1277kcal Carbohydrates: 61g  Protein: 90g                      Fat: 73g' },
    { id: '16', name: 'Chorizo and Potato Pressed Sandwich', image: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/17171/responsive-images/foodnetwork-image-45ca15c7-516d-40bc-b820-0d0651b5db6d___default_572_429.jpeg', nutritionInfo: 'Calories: 559kcal Carbohydrates: 41g  Protein: 22g                      Fat: 34g' },
    { id: '17', name: 'Push Up To show the Last ItemPush Up To show the Last ItemPush Up To show the Last ItemPush Up To show the Last Item', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAADFBMVEX////a183y8e3p5+GxrUxUAAABCElEQVR4nO3PCRHAMBAAoTz+PTeVsTfggLWnW/ueye4bnjXZMcwz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7DPsM+wz7PuH90x233C6Dy43CnVv6eDUAAAAAElFTkSuQmCC', nutritionInfo: 'Calories: 559kcal Carbohydrates: 41g  Protein: 22g                      Fat: 34g' },

    // add more meals
 ];

 const renderMeal = ({ item }) => (
    <View style={styles.mealContainer}>
      <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: item.image }}
      />
      <Text style={styles.mealTitle}>{item.name}</Text>
      <Text style={styles.mealInfo}>{item.nutritionInfo}</Text>
    </View>
 );

 return (
    <View style={styles.container}>
        <FlatList
        data={meals}
        renderItem={renderMeal}
        keyExtractor={item => item.id}
        style={{ flexGrow: 1}}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcccb',
    paddingTop: 20,
 },
 button: {
    backgroundColor: '#FF69B4',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: 300,
    marginBottom: 20, 
 },
 buttonText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
 },
 title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: -200,
    textAlign: "center",
    margin: 100,
    flex: 0,
 },
 mealContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 45,
    width: '80%',
 },
 mealTitle: {
    fontSize: 24,
    fontWeight: "bold",
 },
 mealInfo: {
    fontSize: 18,
    marginTop: 10,
 },
});

export default MealPlanning;