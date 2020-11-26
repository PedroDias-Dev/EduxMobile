import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ( {navigation} ) => {
    let url = 'a';

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idPerfil, setIdPerfil] = useState('');

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
            console.log(data);
            if(data.status != 404){
                alert('Seja bem vindx');
                console.log(data.token);
                
                salvar(data.token);
                navigation.push('Autenticado');
            }else{
                alert('Email ou senha inválidos! :( ');
            }
        })

    }

    return(
        <View style={styles.container}>

            {/* Logo Edux */}

            <Text style={styles.title}>EduX</Text>

            <TextInput
                style={styles.input}
                onChangeText={text => setNome(text)}
                value={nome}
                placeholder="Nome de Usuário"
            />

            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="E-Mail"
            />

            <TextInput
                style={styles.input}
                onChangeText={text => setSenha(text)}
                value={senha}
                placeholder="Senha"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setIdPerfil(text)}
                value={idPerfil}
                placeholder="Id de Perfil"
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={Logar}
            >
                <Text style={styles.textButton}>REGISTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
                // style={styles.button}
                onPress={() => navigation.push('Login')}
            >
                <Text style={styles.textb}>Já tenho uma conta</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input : {
        width: '90%',
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop : 20,
        padding: 5,
        borderRadius: 6
    },
    button : {
        backgroundColor : 'black',
        width: '90%',
        padding : 10,
        borderRadius: 6,
        marginTop : 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton : {
        color : 'white'
    },
    title : {
        fontFamily: 'Titillium Web',
        fontWeight: "900",
        fontSize: 96
    },
    text : {
        color : 'black'
    },
    textb : {
        marginTop: 17,
        color : 'black'
    }
  });

export default Register;