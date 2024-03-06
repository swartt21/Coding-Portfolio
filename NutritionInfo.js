
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NutritionInfo = ({ route, navigation }) => {
    const [carbohydratesInput, setCarbohydratesInput] = useState('');
    const [proteinsInput, setProteinsInput] = useState('');
    const [fatsInput, setFatsInput] = useState('');
    const [caloriesInput, setCaloriesInput] = useState('');
    const [dailyCaloricIntake, setDailyCaloricIntake] = useState(0);
    const [caloriesRemaining, setCaloriesRemaining] = useState(0);
    const [totalDailyCarbohydrates, setTotalDailyCarbohydrates] = useState(0);
    const [totalDailyProteins, setTotalDailyProteins] = useState(0);
    const [totalDailyFats, setTotalDailyFats] = useState(0);

    useEffect(() => {
        const loadNutritionData = async () => {
            try {
                const storedDailyCaloricIntake = await AsyncStorage.getItem('dailyCaloricIntake');
                const storedCarbohydrates = await AsyncStorage.getItem('carbohydrates');
                const storedProteins = await AsyncStorage.getItem('proteins');
                const storedFats = await AsyncStorage.getItem('fats');
                const storedCaloriesRemaining = await AsyncStorage.getItem('caloriesRemaining');

                if (storedDailyCaloricIntake !== null) {
                    setDailyCaloricIntake(parseInt(storedDailyCaloricIntake, 10));
                }
                setCaloriesRemaining(parseInt(storedCaloriesRemaining) || parseInt(storedDailyCaloricIntake, 10) || 0);
                setTotalDailyCarbohydrates(parseInt(storedCarbohydrates) || 0);
                setTotalDailyProteins(parseInt(storedProteins) || 0);
                setTotalDailyFats(parseInt(storedFats) || 0);
            } catch (error) {
                console.error('Error loading nutrition data:', error);
            }
        };

        loadNutritionData();
    }, []);

    const saveNutritionData = async () => {
        try {
            const carbIntake = parseInt(carbohydratesInput) || 0;
            const proteinIntake = parseInt(proteinsInput) || 0;
            const fatIntake = parseInt(fatsInput) || 0;
            const consumedCalories = parseInt(caloriesInput) || 0;

            const newTotalCarbs = totalDailyCarbohydrates + carbIntake;
            const newTotalProteins = totalDailyProteins + proteinIntake;
            const newTotalFats = totalDailyFats + fatIntake;
            const newCaloriesRemaining = caloriesRemaining - consumedCalories;

            setTotalDailyCarbohydrates(newTotalCarbs);
            setTotalDailyProteins(newTotalProteins);
            setTotalDailyFats(newTotalFats);
            setCaloriesRemaining(newCaloriesRemaining);

            await AsyncStorage.setItem('carbohydrates', newTotalCarbs.toString());
            await AsyncStorage.setItem('proteins', newTotalProteins.toString());
            await AsyncStorage.setItem('fats', newTotalFats.toString());
            await AsyncStorage.setItem('caloriesRemaining', newCaloriesRemaining.toString());

            setCarbohydratesInput('');
            setProteinsInput('');
            setFatsInput('');
            setCaloriesInput('');
        } catch (error) {
            console.error('Error saving nutrition data:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.title}>Nutrition Info</Text>
                    <View style={styles.nutritionContainer}>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Carbohydrates"
                            value={carbohydratesInput}
                            onChangeText={setCarbohydratesInput}
                        />
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Proteins"
                            value={proteinsInput}
                            onChangeText={setProteinsInput}
                        />
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Fats"
                            value={fatsInput}
                            onChangeText={setFatsInput}
                        />
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Calories Consumed"
                            value={caloriesInput}
                            onChangeText={setCaloriesInput}
                        />
                        <Text style={styles.subTitle}>Remaining Daily Calories: {caloriesRemaining}</Text>
                        <Text style={styles.subTitle}>Total Daily Carbohydrates: {totalDailyCarbohydrates}</Text>
                        <Text style={styles.subTitle}>Total Daily Proteins: {totalDailyProteins}</Text>
                        <Text style={styles.subTitle}>Total Daily Fats: {totalDailyFats}</Text>
                        {/* TextInput components for carbohydrates, proteins, fats, and calories */}
                        {/* Remaining calories and submit button */}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={saveNutritionData}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffcccb',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 20,
        margin: 10,
    },
    nutritionContainer: {
        width: '80%',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        width: 250,
        backgroundColor: 'white',
    },
});

export default NutritionInfo;
