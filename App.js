import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from './firebaseConfig';
import {NavigationContainer} from '@react-navigation/native' 
import {createStackNavigator} from '@react-navigation/stack' 

import Home from './src/pages/Home';

import Cadastro from './src/pages/Cadastro';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen 
          name = "Home"
          component = {Home}
          options ={{
            headerLeft: null
          }}/>
        <Stack.Screen name = "Cadastro" component = {Cadastro} />
      </Stack.Navigator>

    </NavigationContainer>
   
  );
}