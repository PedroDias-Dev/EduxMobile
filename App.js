import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';

import {TitilliumWeb_400Regular, TitilliumWeb_700Bold, TitilliumWeb_300Light_Italic, TitilliumWeb_900Black, useFonts} from '@expo-google-fonts/titillium-web';

// Navigations
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { AppLoading } from 'expo';

const Drawer = createDrawerNavigator();
const Stack  = createStackNavigator();

// Paginas
import Login from './pages/Login';
import Postagens from './pages/Postagens';
import Home  from './pages/Home (Ranking)';
import Turmas from './pages/Turmas';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TopBar from './components/TopBar'

const Autenticado = () => {
  return(
    <Drawer.Navigator initialRouteName="Postagens">
        <Drawer.Screen name="Postagens" component={Postagens} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="TopBar" component={TopBar} />
    </Drawer.Navigator>
  )
}


export default function App() {

  let [fontsLoaded] = useFonts({
    TitilliumWeb_400Regular,
    TitilliumWeb_700Bold,
    TitilliumWeb_300Light_Italic,
    TitilliumWeb_900Black
  });
  if (!fontsLoaded){
    return <AppLoading />
  } 

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown : false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Autenticado" component={Autenticado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});