import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import OpeningScreen from './OpeningScreen';
import Map from './Map';
import Home from './Home';
import SplashScreen from './SplashScreen';
import ChatScreen from './ChatScreen';
console.disableYellowBox = true;

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerShown="false">
        <Stack.Screen name="Opening" component={OpeningScreen} options={{headerLeft:null, headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerLeft:null, headerShown:false}}/>
        <Stack.Screen name="Map" component={Map} options={{headerLeft:null, headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerLeft:null, headerShown:false}}/>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerLeft:null, headerShown:false}}/>
        <Stack.Screen name="Chat" component={ChatScreen} options={{headerLeft:null, headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
