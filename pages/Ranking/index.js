import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert } from 'react-native';
import TopBar from '../../components/TopBar';

const Home = ({navigation}) => {
    let url = 'https://5f7f873fd6aabe00166f06be.mockapi.io/nyous/perfil'
    
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
            borderRadius: 80,
			padding: 20,
			paddingLeft: 40,
			paddingRight: 40,
			alignItems: 'center'
			
        },
        number : {
            fontSize: 30, 
            fontFamily: 'TitilliumWeb_900Black',
            color: 'white',
            marginLeft: 8
        },
        bottomText : {
            width: 65, 
            color: 'white',
            fontFamily: 'TitilliumWeb_400Regular',
			marginBottom: 8,
			alignItems: 'center'
        }

      });
    return(
        <View>
            <TopBar navigation={navigation} />
            <Text style={styles.title}>RANKING GERAL</Text>

            <View style={{alignSelf: 'center', flexDirection:"row", justifyContent: 'center', backgroundColor: '#9200D6', borderRadius:30, marginTop: 30}}>
                <View style={{flexDirection:"row", justifyContent: 'center'}}>
                    <Image source="https://avatars2.githubusercontent.com/u/61596627?s=460&u=a732711476392ccc25786fb308203dcf21e85ed5&v=4" style={{width:60, height:60, borderRadius:30 }} />
                    <View style={{alignSelf: 'center', padding: 9, marginRight: 15}}>
                        <Text style={{fontFamily: 'TitilliumWeb_700Bold', color: 'white'}}>Paulinho Gamer 2007</Text>
                        <Text style={{fontSize: 10, fontFamily: 'TitilliumWeb_400Regular', color: 'white'}}>2 - Desenvolvimento de Sistemas</Text>
                    </View>
                </View>
            </View>

            <View style={{marginTop: 50, }}>
                <View style={{alignSelf: 'center', alignItems: 'center'}}>
                    <View style={[styles.ranking, {backgroundColor: '#00D65F'}]}>
                        <Text style={styles.number}>3º</Text>
                        <Text style={{color: 'white'}}>3453</Text>
                        <Text style={styles.bottomText}>Objetivos concluidos</Text>
                    </View>
                </View>

                <View style={{alignSelf: 'center', flexDirection: 'row', }}>
                    <View style={[styles.ranking, {marginRight: 70, backgroundColor: '#00C2EE'}]}>
                        <Text style={styles.number}>3º</Text>
                        <Text style={{color: 'white'}}>3453</Text>
                        <Text style={styles.bottomText}>Objetivos concluidos</Text>
                    </View>

                    <View style={[styles.ranking, {backgroundColor: '#9200D6'}]}>
                        <Text style={styles.number}>3º</Text>
                        <Text style={{color: 'white'}}>3453</Text>
                        <Text style={styles.bottomText}>Objetivos concluidos</Text>
                    </View>
                </View>

                <View style={{alignSelf: 'center'}}>
                    <View style={[styles.ranking, {backgroundColor: '#FF271C'}]}>
                        <Text style={styles.number}>3º</Text>
                        <Text style={{color: 'white'}}>3453</Text>
                        <Text style={styles.bottomText}>Objetivos concluidos</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Home;