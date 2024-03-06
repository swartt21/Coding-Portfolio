import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
 return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to StayPhit!</Text>
      <Button
        title="New Users"
        onPress={() => navigation.navigate('Slideshow')}
        color="#ff69b4"
      />
      <Button
        title="Existing Users"
        onPress={() => navigation.navigate('Dash')}
        color="#ff69b4"
      />
    </View>
 );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#ffcccb',
    alignItems: 'center',
    justifyContent: 'center',
 },
 text: {
    fontSize: 24,
    color: 'white',
 },
});

export default HomeScreen;
