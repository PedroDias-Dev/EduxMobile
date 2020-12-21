// PROJETO EDUX
// 11 E 12/2020
// PEDRO

import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Linking } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ( {navigation} ) => {
    // let url = 'http://localhost:55718/api/Login';
    // let url = 'https://5f7f873fd6aabe00166f06be.mockapi.io/nyous/edux'

    let url = 'http://192.168.15.7:55718/api/Login';
    // let url = 'http://localhost:5000/api/Login';

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const salvar = async (value) => {
        try {
          await AsyncStorage.setItem('@jwt', value)
        } catch (e) {

        }
    }

    const Logar = () => {
        
        const corpo = {
            email : email,
            senha : senha
        }

        fetch(url, {
            method: 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(corpo)
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data.token);
            if(data.status != 404){
                alert('Seja bem vindx ao EduX!');
                // console.log(data);
                
                salvar(data.token);
                navigation.push('Autenticado');
            }else{
                alert('Email ou senha inválidos! :( ');
            
        }})

    }

    return(
        <View style={styles.container}>

            {/* Logo Edux */}

            <Text style={[styles.title, {marginBottom: 30}]}>EduX</Text>

            <Text style={[styles.title, {fontSize: 25, fontFamily: 'TitilliumWeb_700Bold'}]}>Login</Text>

            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="E-mail"
                placeholderTextColor="#9200D6" 
            />

            <TextInput
                style={[styles.input, {fontFamily: 'TitilliumWeb_400Regular'}]}
                onChangeText={text => setSenha(text)}
                value={senha}
                placeholder="Senha"
                placeholderTextColor="#9200D6" 
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={Logar}
            >
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                // style={styles.button}
                // onPress={() => navigation.push('Register')}
                onPress={() => Linking.openURL('eduX.com.br/register')}
            >
                <Text style={styles.text}>Não tenho uma conta</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#9200D6',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'TitilliumWeb_400Regular'
    },
    input : {
        width: '90%',
        backgroundColor: 'white',
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop : 20,
        padding: 5,
        paddingLeft: 25,
        borderRadius: 6,
        marginBottom: 15,
        fontFamily: 'TitilliumWeb_400Regular', 
        color: '#9200D6'
    },
    button : {
        backgroundColor : 'white',
        width: '90%',
        padding : 5,
        borderRadius: 6,
        marginTop : 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton : {
        fontFamily: 'TitilliumWeb_900Black',
        color : '#9200D6',
        fontSize: 20
    },
    logo : {
        width: 200,
        height: 200,
    },
    text : {
        fontFamily: 'TitilliumWeb_400Regular',
        marginTop: 17,
        color : '#00C2EE'
    },
    title : {
        fontFamily: 'TitilliumWeb_900Black',
        fontWeight: "900",
        fontSize: 96,
        color: 'white'
    }
  });

export default Login;