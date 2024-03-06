import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NutritionGoals = ({ navigation }) => {
  const [nutritionGoal, setNutritionGoal] = useState("");

  const handleSubmit = async () => {
    try {
      // Validate the input (e.g., make sure it's "gain" or "lose")
      if (nutritionGoal.toLowerCase() !== "gain" && nutritionGoal.toLowerCase() !== "lose") {
        Alert.alert("Invalid Input", "Please enter 'gain' or 'lose'.");
        return;
      }

      // Store the nutrition goal
      await AsyncStorage.setItem("nutritionGoal", nutritionGoal.toLowerCase());

      // Navigate to the CaloricRecommendation screen
      navigation.navigate("Animated");
    } catch (error) {
      console.log("Error storing nutrition goal:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Enter Your Nutrition Goal!
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nutrition Goals (gain/lose) weight"
        onChangeText={(text) => setNutritionGoal(text)}
      />
      <Button title="Submit Nutrition Goals" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffcccb",
  },
  input: {
    height: 40,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    width: 300,
    textAlign: "center",
  },
});

export default NutritionGoals;
