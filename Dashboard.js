import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Dashboard extends React.Component {
 render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Nutrition')}>
          <Text style={styles.buttonText}>Nutrition Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Recipes')}>
          <Text style={styles.buttonText}>Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Meal')}>
          <Text style={styles.buttonText}>Meal Planning</Text>
        </TouchableOpacity>
      </View>
    );
 }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcccb',
 },
 button: {
    backgroundColor: '#FF69B4',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: 300,
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
});