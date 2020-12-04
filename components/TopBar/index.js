// PROJETO EDUX
// 11 E 12/2020
// PEDRO

import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, SafeAreaView } from 'react-native';
// import { Icon } from 'react-native-elements'

import imgSair from '../../assets/img/Vector.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Logout from '../../App';

const TopBar = ({ navigation }) => {
    const Logout = () => {
        Alert.alert(
            "Isso é um adeus? :(",
            "Deseja sair de sua conta?",
            [
              {
                text: "Sim",
                onPress: () => {
                    AsyncStorage.removeItem('@jwt');
                    navigation.push('Login');
                }
              },
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              }
            ],
            { cancelable: false }
        );
    };

    return(
        <View style={{backgroundColor: '#9200D6', height: 45, justifyContent: 'center', marginTop: 31}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 17}}>
                <Text style={{color: 'white', fontFamily: 'TitilliumWeb_900Black'}}>EDUX</Text>
                <TouchableOpacity
                    onPress={Logout}
                >
                    <Image source={imgSair}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default TopBar;