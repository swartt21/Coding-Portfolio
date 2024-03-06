import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const MyCarousel = () => {
 const navigation = useNavigation();
 const [currentIndex, setCurrentIndex] = useState(0);

 const windowWidth = Dimensions.get('window').width;
 const windowHeight = Dimensions.get('window').height;

const Slide1 = require('../assets/Slide1.jpg');
const Slide2 = require('../assets/Slide2.jpg');
const Slide3 = require('../assets/Slide3.jpg');
const Slide4 = require('../assets/Slide4.jpg');
const Slide5 = require('../assets/Slide5.jpg');
const Slide6 = require('../assets/Slide6.jpg');
const Slide7 = require('../assets/Slide7.jpg');

 const imageArray = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
 ];

 const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item}</Text>
        <Image source={item} style={{ width: windowWidth, height: windowHeight }} />
      </View>
    );
 };

 const showNextImage = () => {
    setCurrentIndex((currentIndex + 1) % imageArray.length);

 };

 const handleFinishTutorial = () => {
   navigation.navigate('Registration');
 };

 return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        ref={(c) => {
          this._carousel = c;
        }}
        data={imageArray}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        enableMomentum={false}
        activeSlideAlignment={'start'}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.slideInnerContainer}
        onSnapToItem={(index) => {
          setCurrentIndex(index);
          showNextImage();
        }}
      />
      {currentIndex === imageArray.length - 1 && (
        <TouchableOpacity style={styles.button} onPress={handleFinishTutorial}>
          <Text style={styles.buttonText}>Finish Tutorial</Text>
        </TouchableOpacity>
      )}
    </View>
 );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   slider: {
      overflow: 'visible',
   },
   slideInnerContainer: {
      alignItems: 'center',
      paddingBottom: 0,
   },
   slide: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      paddingHorizontal: 20,
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
   },
   title: {
      fontSize: 30,
      color: '#000000',
   },
   button: {
     backgroundColor: '#007AFF',
     paddingHorizontal: 20,
     paddingVertical: 10,
     borderRadius: 5,
     marginTop: 10,
     marginBottom: 50,
   },
   buttonText: {
     color: '#fff',
     fontSize: 18,
   },
});

export default MyCarousel;