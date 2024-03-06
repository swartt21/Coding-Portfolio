import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const CaloricRecommendation = () => {
  const [baseCaloricIntake, setBaseCaloricIntake] = useState(0);
  const [dailyCaloricIntake, setDailyCaloricIntake] = useState(0);
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [nutritionGoal, setNutritionGoal] = useState(""); // Goal can be "gain", "lose", or "" (maintain)
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAndCalculateCalories = async () => {
      try {
        const weight = await AsyncStorage.getItem("weight");
        const height = await AsyncStorage.getItem("height");
        const age = await AsyncStorage.getItem("age");
        const gender = await AsyncStorage.getItem("gender");
        const storedNutritionGoal = await AsyncStorage.getItem("nutritionGoal") || "";

        let baseCalories;
        if (gender === "male") {
          baseCalories = 10 * parseInt(weight) + 6.25 * parseInt(height) - 5 * parseInt(age) + 5;
        } else {
          baseCalories = 10 * parseInt(weight) + 6.25 * parseInt(height) - 5 * parseInt(age) - 161;
        }

        setNutritionGoal(storedNutritionGoal);
        setBaseCaloricIntake(baseCalories);
        updateDailyCaloricIntake(baseCalories, activityLevel, storedNutritionGoal);
      } catch (error) {
        console.log("Error fetching health information and calculating calories:", error);
      }
    };

    fetchAndCalculateCalories();
  }, []);

  const updateDailyCaloricIntake = (baseCalories, activityLevel, nutritionGoal) => {
    let calorieAdjustment = 0;
    if (nutritionGoal === "gain") {
      calorieAdjustment = 500;
    } else if (nutritionGoal === "lose") {
      calorieAdjustment = -500;
    }

    const adjustedCalories = Math.round(baseCalories * activityLevel + calorieAdjustment);
    setDailyCaloricIntake(adjustedCalories);
  };

  useEffect(() => {
    const updateDailyCaloricIntake = (baseCalories, activityLevel, nutritionGoal) => {
      let calorieAdjustment = 0;
      if (nutritionGoal === "gain") {
        calorieAdjustment = 500;
      } else if (nutritionGoal === "lose") {
        calorieAdjustment = -500;
      }
  
      const adjustedCalories = Math.round(baseCalories * activityLevel + calorieAdjustment);
      setDailyCaloricIntake(adjustedCalories);
      AsyncStorage.setItem('dailyCaloricIntake', adjustedCalories.toString());
    };
  
    updateDailyCaloricIntake(baseCaloricIntake, activityLevel, nutritionGoal);
  }, [activityLevel, baseCaloricIntake, nutritionGoal]);
  

  const handleSubmit = () => {
    navigation.navigate("Dash", { dailyCaloricIntake });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caloric Recommendation</Text>
      <Text style={styles.text}>
        Based on your stored health information, your recommended daily caloric intake is:
      </Text>
      <Text style={styles.result}>{dailyCaloricIntake} calories</Text>

      <Text style={styles.sliderLabel}>Activity Level</Text>
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={1.2}
        maximumValue={1.9}
        step={0.175}
        value={activityLevel}
        onValueChange={(value) => setActivityLevel(value)}
      />

      <View style={styles.sliderLabelContainer}>
        <Text style={styles.sliderLabelLeft}>Sedentary: Little to No Exercise</Text>
        <Text style={styles.sliderLabelMiddle}>Moderately Active: Moderate Exercise 3-5 Days per Week</Text>
        <Text style={styles.sliderLabelRight}>Extra Active: Very Hard Exercise 6-7 Days per Week</Text>
      </View>
      <Button title="Head to Dashboard" onPress={handleSubmit} color="#ff69b4" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffcccb",
  },
  title: {
    fontSize: 24,
    marginTop: 60,
    textAlign: "center",
    margin: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
  result: {
    width: "90%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  sliderLabel: {
    fontSize: 16,
    marginTop: 10,
  },
  sliderLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  sliderLabelLeft: {
    width: "33%",
    textAlign: "center",
  },
  sliderLabelMiddle: {
    width: "33%",
    textAlign: "center",
  },
  sliderLabelRight: {
    width: "33%",
    textAlign: "center",
  },
});

export default CaloricRecommendation;
