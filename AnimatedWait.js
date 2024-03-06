import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default class AnimatedWait extends Component {
 componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Caloric');
    }, 3000); //2 seconds
 }

 render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
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
});