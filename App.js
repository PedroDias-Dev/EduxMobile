// PROJETO EDUX
// 11 E 12/2020

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import {TitilliumWeb_400Regular, TitilliumWeb_700Bold, TitilliumWeb_300Light_Italic, TitilliumWeb_900Black, useFonts} from '@expo-google-fonts/titillium-web';
import { AppLoading } from 'expo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack  = createStackNavigator();

import TopBar from './components/TopBar'

const Autenticado = () => {
  return(
        <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({  color, size }) => {
                  let iconName;

                  if (route.name === 'Ranking') {
                    iconName = 'school';
                  } else if (route.name === 'Turmas') {
                    iconName =  'graduation-cap';
                  }else if (route.name === 'Objetivos') {
                    iconName = 'graduation-cap';
                  }
                  else if (route.name === 'Postagens') {
                    iconName = 'comment';
                  }
                
                  return <FontAwesome5 name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeBackgroundColor: '#00B751',
                inactiveBackgroundColor: '#00D65F',
                activeTintColor: '#fff',
                inactiveTintColor: '#fff',
                labelStyle: {
                  fontSize: 11,
                  fontWeight:'bold',
                  margin: 0,
                  padding: 0,
                },
              }        
          }>
          <Tab.Screen name="Ranking" component={Ranking} />
          <Tab.Screen name="Turmas" component={Turmas} />
          <Tab.Screen name="Objetivos" component={Objetivos} />
          {/* <Tab.Screen name="Home" component={Home} /> */}
          <Tab.Screen name="Postagens" component={Postagens} />
        </Tab.Navigator>

  )
}

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FontAwesome5} from '@expo/vector-icons'

// Paginas
import Login from './pages/Login';
import Postagens from './pages/Postagens';
import Ranking  from './pages/Ranking';
import Turmas from './pages/Turmas';
import Objetivos from './pages/Objetivos';
//Navigation

const Tab = createBottomTabNavigator();

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
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Autenticado" component={Autenticado} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};