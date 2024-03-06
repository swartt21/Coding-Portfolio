import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HealthInfo = () => {
 const [age, setAge] = useState('');
 const [height, setHeight] = useState('');
 const [weight, setWeight] = useState('');
 const [gender, setGender] = useState('');
 const navigation = useNavigation();

const handleSubmit = async () => {
 try {
    // handle the health information submission logic here
    Alert.alert('Health Information Submitted', 'You can now use the app!', [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
      { text: 'Proceed', onPress: () => navigation.navigate('Goals') },
    ]);

    // Store the health information
    await AsyncStorage.setItem('age', age);
    await AsyncStorage.setItem('height', height);
    await AsyncStorage.setItem('weight', weight);
    await AsyncStorage.setItem('gender', gender);
 } catch (error) {
    console.log('Error storing health information:', error);
 }
};

 return (
    <View style={styles.container}>
      <Text style={styles.text}>Health Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Age in Years"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Height in Centimeters"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight in Kilograms"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Biological Gender (male or female)"
        value={gender}
        onChangeText={setGender}
      />
      <Button title="Submit" onPress={handleSubmit} color="#ff69b4" />
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#ffcccb',
    alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: 70,
 },
 text: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
 },
 input: {
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
 },
});

export default HealthInfo;
