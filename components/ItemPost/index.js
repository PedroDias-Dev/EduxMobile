// PROJETO EDUX
// 11 E 12/2020
// PEDRO

import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
      marginTop:60
    },
    listItem:{
      margin: 10,
      padding:10,
      backgroundColor:"#FFF",
      width:"80%",
      flex:1,
      alignSelf:"center",
      flexDirection:'row',
      borderRadius:5,
      borderWidth: 2,
    //   borderColor: '#00C2EE' Azul claro
    //   borderColor: '#341948'
      borderColor: '#00C2EE'
    },
    descricao:{
      marginTop: 15,
      color: 'black'
    }
  });

const ItemPost = (posts) => {
    
    const {descricao, imagem, curtidas, data, id, nomeUser} = posts;

    //valor de curtidas reserva para update
    const [curtidass, setCurtidass] = useState(curtidas)

    let url = 'https://5f7f873fd6aabe00166f06be.mockapi.io/nyous/edux'

    const imagemm = () =>{
        if (imagem === "" ){
            return(
                <Text style={{alignSelf: 'center', marginTop: 5, fontFamily: 'TitilliumWeb_300Light_Italic'}}>Não há imagem </Text>
            )
        }
        else{
            return(
                <Image source={{uri:imagem}}  style={{width:294, height:160,borderRadius:4}} />
            );
        }
    };

    const likes = (event, id) => {
        event.preventDefault();
        // console.log(event)

        fetch(`${url}/${id}`, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            // console.log(dado);
            console.log(dado.curtidas)

            var curtidas = Number(dado.curtidas);


            const post = {
                nome : dado.nome,
                urlImagem : dado.urlImagem,
                link : dado.link,
                descricao : dado.descricao,
                nomeUser: dado.nomeUser,
                curtidas: dado.curtidas + 1
            }     

            fetch(`${url}/${id}`, {
                method : 'PUT',
                body : JSON.stringify(post),
                headers : {
                    'content-type' : 'application/json'
                }
            })
            .then(response => response.json())
            .then(dadoS => {
                console.log(dadoS)
                console.log(curtidas)
                //atualiza o valor das curtidas sem reload da pagina
                setCurtidass(dadoS.curtidas)
        })
        })

        
    }

    return (
        <View style={styles.listItem}>
            
                <View style={{justifyContent: 'center', alignSelf: 'center'}}>

                    {imagemm()}

                    <View style={styles.descricao}>
                        <Text style={{width: 290, fontFamily: 'TitilliumWeb_400Regular', color: '#323133'}}>{descricao}</Text>
                        <Text style={{width: 290, fontFamily: 'TitilliumWeb_300Light_Italic', marginTop: 5}}>by {nomeUser}</Text>

                    </View>
                    
                    <View style={{alignItems:"center", flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{height:50,width:100, alignItems:"center", flexDirection: 'row'}}>
                            <TouchableOpacity 
                            key={id}
                            onPress={(e) => {likes(e, id)}}
                            >

                                <Icon
                                    name='heart'
                                    type='font-awesome'
                                    color='#00C2EE'
                                />
                            </TouchableOpacity>
                            <Text style={{color:"#00C2EE", marginLeft: 15, fontSize: 20, fontFamily: 'TitilliumWeb_400Regular'}}>{curtidass}</Text>
                        </View>
                            <Text style={{color:"#00C2EE", fontFamily: 'TitilliumWeb_400Regular'}}>{data}</Text>
                    </View>
                </View>
            
        </View>
    )
}

export default ItemPost;