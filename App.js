// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// // Navigations
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';

// const Drawer = createDrawerNavigator();
// const Stack  = createStackNavigator();

// // Paginas
// import Login from './pages/Login';
// // import Register from './pages/Register';
// import Postagens from './pages/Postagens';
// import Home  from './pages/Home (Ranking)';
// // import Eventos  from './pages/Eventos';
// import Turmas from './pages/Turmas';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Autenticado = () => {
//   return(
//     <Drawer.Navigator initialRouteName="Post">
//         <Drawer.Screen name="Postagens" component={Postagens} />
//         <Drawer.Screen name="Home" component={Home} />
//         <Drawer.Screen name="Logout" component={Logout} />
//     </Drawer.Navigator>
//   )
// }

// const Logout = ( {navigation} ) => {
//   return(
//     <View>
//       <Text>Deseja realmente sair da aplicação?</Text>
//       <Button onPress={() => {
//         AsyncStorage.removeItem('@jwt');
//         navigation.push('Login');
//       }} title="SAIR" ></Button>
//     </View>
//   )
// }

// // const Tab = createBottomTabNavigator();

// // function BottomTab() {
// //   return (
// //     <Tab.Navigator>
// //       <Tab.Screen name="Postagens" component={Postagens} />
// //       <Tab.Screen name="Turmas" component={Turmas} />
// //     </Tab.Navigator>
// //   );
// // }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown : false }}>
//         <Stack.Screen name="Postagens" component={Postagens} />
//         <Stack.Screen name="Turmas" component={Turmas} />
//         <Stack.Screen name="Login" component={Login} />
//         {/* <Drawer.Screen name="Register" component={Register} /> */}
//         <Stack.Screen name="Autenticado" component={Autenticado} />
//       </Stack.Navigator>

//     </NavigationContainer>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FontAwesome5} from '@expo/vector-icons'

// Paginas
import Login from './pages/Login';
// import Register from './pages/Register';
import Postagens from './pages/Postagens';
import Ranking  from './pages/Ranking';
// import Eventos  from './pages/Eventos';
import Turmas from './pages/Turmas';
//Navigation

const Tab = createBottomTabNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({  color, size }) => {
                  let iconName;

                  if (route.name === 'Ranking') {
                    iconName = 'school';
                  } else if (route.name === 'Turmas') {
                    iconName =  'graduation-cap';
                  }
                      // else if (route.name === 'Objetivos') {
                      //   iconName = 'chalkboard-teacher';
                      // }
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
          {/* <Tab.Screen name="Home" component={Objetivos} /> */}
          <Tab.Screen name="Postagens" component={Postagens} />
        </Tab.Navigator>

      </NavigationContainer>

  );
};