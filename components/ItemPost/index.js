import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Icon } from 'react-native-elements'

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
      borderColor: 'blue'
    },
    descricao:{
      marginTop: 15,
      color: 'black'
    }
  });

const ItemPost = (post) => {
    useEffect(() => {
        listarPosts();
    }, []);

    const {nome, imagem, descricao, curtida} = post;

    let url = 'https://5f7f873fd6aabe00166f06be.mockapi.io/nyous/edux'

    const listarPosts = () => {
        fetch(url, {
          method: 'GET'
        })
        .then(response => response.json())
        .then(dados => {
          setPost(dados);

          console.log(dados);
        })
        .catch(err => console.log(err))
      }

    const likes = (event) => {
        event.preventDefault();

        fetch(`${url}/${event.target.value}`, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);
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

            fetch(`${url}/${event.target.value}`, {
                method : 'PUT',
                body : JSON.stringify(post),
                headers : {
                    'content-type' : 'application/json'
                }
            })
            .then(response => response.json())
            .then(dadoS => {
            console.log(dadoS.curtidas)

            listarPosts();
        })
        })

        
    }

    return (
        <View style={styles.listItem}>
            <View style={{justifyContent: 'center'}}>
                <Image source={{uri:imagem}}  style={{width:294, height:160,borderRadius:4}} />

                <View style={styles.descricao}>
                    {/* <Text style={{fontWeight:"bold"}}>{descricao}</Text> */}
                    <Text style={{fontWeight:"bold", width: 290}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                </View>
                
                <View style={{alignItems:"center", flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{height:50,width:100, alignItems:"center", flexDirection: 'row'}}>
                        <TouchableOpacity >
                        <Icon
                            name='heart'
                            type='font-awesome'
                            onPress={likes} />
                        </TouchableOpacity>
                        {/* <Text style={{color:"blue", marginLeft: 15, fontSize: 20}}>{curtida}</Text> */}
                        <Text style={{color:"blue", marginLeft: 15, fontSize: 20}}>3567</Text>
                    </View>

                        <Text style={{color:"blue"}}>22/11/2020</Text>
                </View>
            </View>
        </View>
    )
}

export default ItemPost;