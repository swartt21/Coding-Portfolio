import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './screens/RegistrationScreen';
import HealthInfo from './screens/HealthInfo';
import HomeScreen from './screens/HomeScreen';
import NutritionGoals from './screens/NutritionGoals';
import CaloricRecommendation from './screens/CaloricRecommendation';
import AnimatedWait from './screens/AnimatedWait';
import Dashboard from './screens/Dashboard';
import Slideshow from './screens/Slideshow';
import Recipes from './screens/Recipes';
import MealPlanning from './screens/MealPlanning';
import NutritionInfo from './screens/NutritionInfo';

const Stack = createStackNavigator();

function App() {
 return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Slideshow" component={Slideshow}/>
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Health" component={HealthInfo} />
        <Stack.Screen name="Goals" component={NutritionGoals} />
        <Stack.Screen name="Animated" component={AnimatedWait}/>
        <Stack.Screen name="Caloric" component={CaloricRecommendation}/>
        <Stack.Screen name= "Dash" component={Dashboard}/>
        <Stack.Screen name="Recipes" component={Recipes}/>
        <Stack.Screen name="Meal" component={MealPlanning}/>
        <Stack.Screen name= "Nutrition" component={NutritionInfo}/>
      </Stack.Navigator>
    </NavigationContainer>
 );
}

export default App;
