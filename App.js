import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// Navigations
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const Stack  = createStackNavigator();

// Paginas
import Login from './pages/Login';
import Register from './pages/Register';
import Home  from './pages/Home';
// import Eventos  from './pages/Eventos';
import Turmas from './pages/Turmas';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Autenticado = () => {
  return(
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Logout" component={Logout} />
        {/* <Drawer.Screen name="Eventos" component={Eventos} /> */}
    </Drawer.Navigator>
  )
}

const Logout = ( {navigation} ) => {
  return(
    <View>
      <Text>Deseja realmente sair da aplicação?</Text>
      <Button onPress={() => {
        AsyncStorage.removeItem('@jwt');
        navigation.push('Login');
      }} title="SAIR" ></Button>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown : false }}>
      <Stack.Screen name="Turmas" component={Turmas} />
        <Stack.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
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
  },
});