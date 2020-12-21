// PROJETO EDUX
// 11 E 12/2020
// PEDRO

import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../../components/TopBar';
import  jwt_decode  from 'jwt-decode';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({navigation}) => {
    //PROCESSAMENTO DE TOKEN
    let token = AsyncStorage
        .getItem('@jwt')
        .then((value) => {
            let IdUsuario = jwt_decode(value).id;

            let Nome = jwt_decode(value).nameid;
            let Email = jwt_decode(value).email;
            let Role = jwt_decode(value).role;

            setIdUsuario(IdUsuario);
            // console.log(idUsuario)

            setNome(Nome);
            setEmail(Email);
            setRole(Role);

            listarConquistas(idUsuario)
    });
        
    
    //
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const [idUsuario, setIdUsuario] = useState('');

    const [postagensTotais, setPostagensTotais] = useState('');
    const [curtidasTotais, setCurtidasTotais] = useState('');
    const [conquistasTotais, setConquistasTotais] = useState('');
    const [conquistasOcultas, setConquistasOcultas] = useState('');

    const listarConquistas = (id) =>{
        fetch('http://192.168.15.7:55718/api/Usuario/' + id, {
                method : 'GET'
            })
            .then(response => response.json())
            .then(dados => {
                // console.log(dados);

                setPostagensTotais(dados.postagensTotais);
                setCurtidasTotais(dados.curtidasTotais);

                setConquistasTotais(dados.conquistasTotais);
                setConquistasOcultas(dados.conquistasOcultas);
            })
            .catch(err => console.log(err))
    };
    
    useEffect(() => {
        // listarConquistas();
        // token();
    }, []);
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'white',
          marginTop:60
        },
        listItem:{
          margin:10,
          padding:10,
          backgroundColor:"#FFF",
          width:"80%",
          flex:1,
          alignSelf:"center",
          flexDirection:"row",
          borderRadius:5
        },
        button : {
            backgroundColor : 'black',
            width: '35%',
            padding : 10,
            borderRadius: 6,
            marginTop : 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
        },
        input : {
            width: '80%',
            height: 40, 
            borderColor: '#9200D6', 
            borderWidth: 1,
            marginTop : 20,
            padding: 5,
            borderRadius: 6,
            alignSelf: 'center',
            color: '#BEBFBF',
            fontFamily: 'TitilliumWeb_400Regular'
        },
        textButton : {
            color : 'white',
            fontFamily: 'TitilliumWeb_400Regular'
        },
        title : {
            fontFamily: 'TitilliumWeb_900Black',
            fontWeight: "900",
            fontSize: 35,
            color: '#9200D6',
            alignSelf: 'center',
            marginTop: 30
        },
        ranking: {
            flexDirection: 'column', 
			textAlign: 'center', 
            backgroundColor: '#9200D6' , 
            borderRadius: 90,
			padding: 20,
			paddingLeft: 29,
			paddingRight: 29,
			alignItems: 'center'
			
        },
        number : {
            fontSize: 30, 
            fontFamily: 'TitilliumWeb_900Black',
            color: 'white',
            marginLeft: 5
        },
        bottomText : {
            width: 67, 
            color: 'white',
            fontFamily: 'TitilliumWeb_400Regular',
            marginLeft: 15,
			marginBottom: 8,
			alignItems: 'center'
        }

      });


      //PROCESSAMENTO DO TOKEN JWT
    
      //



    return(
        <View>
            <TopBar navigation={navigation} />
            <Text style={styles.title}>RANKING GERAL</Text>

            <View style={{alignSelf: 'center', flexDirection:"row", justifyContent: 'center', backgroundColor: '#9200D6', borderRadius:30, marginTop: 30}}>
                <View style={{flexDirection:"row", justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'TitilliumWeb_300Light_Italic', fontSize: 10, width: 40, alignSelf: 'center', color: 'white', marginLeft: 20}}>Sem imagem</Text>

                    {/* imagem de perfil */}
                    {/* <Image source="https://avatars2.githubusercontent.com/u/61596627?s=460&u=a732711476392ccc25786fb308203dcf21e85ed5&v=4" style={{width:60, height:60, borderRadius:30 }} /> */}
                    
                    <View style={{alignSelf: 'center', padding: 9, marginRight: 15}}>
                        <Text style={{fontFamily: 'TitilliumWeb_700Bold', color: 'white'}}>{nome}</Text>
                        <Text style={{fontSize: 10, fontFamily: 'TitilliumWeb_400Regular', color: 'white'}}>{email}</Text>
                    </View>
                </View>
            </View>

            <View style={{marginTop: 50, }}>
                <View style={{alignSelf: 'center', alignItems: 'center'}}>
                    <View style={[styles.ranking, {backgroundColor: '#00D65F'}]}>
                        <Text style={styles.number}>3º</Text>
                        <Text style={{color: 'white'}}>{conquistasTotais}</Text>
                        <Text style={styles.bottomText}>Conquistas Totais</Text>
                    </View>
                </View>

                <View style={{alignSelf: 'center', flexDirection: 'row', }}>
                    <View style={[styles.ranking, {marginRight: 70, backgroundColor: '#00C2EE'}]}>
                        <Text style={[styles.number, {marginLeft: 1}]}>{postagensTotais}</Text>
                        {/* <Text style={{color: 'white'}}>{postagensTotais}</Text> */}
                        <Text style={styles.bottomText}>Postagens feitas</Text>
                    </View>

                    <View style={[styles.ranking, {backgroundColor: '#9200D6'}]}>
                        <Text style={[styles.number, {marginLeft: 1}]}>{curtidasTotais}</Text>
                        {/* <Text style={{color: 'white'}}></Text> */}
                        <Text style={styles.bottomText}>Curtidas Totais</Text>
                    </View>
                </View>

                <View style={{alignSelf: 'center'}}>
                    <View style={[styles.ranking, {backgroundColor: '#FF271C'}]}>
                        <Text style={styles.number}>8º</Text>
                        <Text style={{color: 'white'}}>{conquistasOcultas}</Text>
                        <Text style={styles.bottomText}>Conquistas Ocultas</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Home;