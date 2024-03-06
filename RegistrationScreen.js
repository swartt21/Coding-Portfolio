import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function RegistrationScreen() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const navigation = useNavigation();

 function validateEmail(email) {
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return re.test(email);
 }

 function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
 }

 async function register() {
    try {
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address.');
      }

      if (!validatePassword(password)) {
        throw new Error('Please enter a valid password. It should contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.');
      }

      // Call your actual registration logic here
      // For example:
      // const response = await fetch('https://api.example.com/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to register the user.');
      // }

      alert('Registration successful!');
      navigation.navigate('Health');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
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

 return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
      />
      <Button style={styles.button} title="Register" onPress={register} />
    </View>
 );
}
