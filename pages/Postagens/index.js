// PROJETO EDUX
// 11 E 12/2020
// PEDRO

import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, Platform } from 'react-native';

import ItemPost from '../../components/ItemPost';
import TopBar from '../../components/TopBar';

import * as ImagePicker from 'expo-image-picker';

import  jwt_decode  from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Postagens = ( {navigation} ) => {
    // let url = 'http://localhost:5000/api/Dica'
    let url = 'http://192.168.15.7:55718/api/Dica'
    // let url = 'https://5f7f873fd6aabe00166f06be.mockapi.io/nyous/edux'

    const [ idDica, setIdDica] = useState(0);
    const [ idUsuario, setIdUsuario] = useState(0);

    const [nome, setNome] = useState('');
    const [link, setLink] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [texto, setTexto] = useState('');
    const [nomeUser, setNomeUser] = useState('');
    const [posts, setPost] = useState([]);
    const [cursoId, setCursoId] = useState('');
    const [cursos, setCursos] = useState([]);

    // NAME POLICIES
    const [show, setShow] = useState(false);
    const target = useRef(null);

    //CONQUISTAS
    const [postagensTotais, setPostagensTotais] = useState('');
    const [curtidasTotais, setCurtidasTotais] = useState('');

    //IMAGE
    const [image, setImage] = useState('');

    const pickImage = async () => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            })();
        
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
        setImage(result.uri);
        console.log(image)

        uploadFile(result)
    
        if (!result.cancelled) {

          

          

          
        }
    };

    useEffect(() => {
        listarPosts();
    }, []);

    const listarPosts = () => {
        fetch(url, {
          method: 'GET'
        })
        .then(response => response.json())
        .then(dados => {
          setPost(dados.data);

          console.log(dados);
        })
        .catch(err => console.log(err))
    }



    const limparCampos = () => {
        setIdDica(0);
        setNome('');
        setLink('');
        setUrlImagem('');
        // setDescricao('');
        setTexto("")
        setNomeUser('');
        setCursoId(0);
        setImage(null);
    }

    let token = AsyncStorage
        .getItem('@jwt')
        .then((value) => {
            let IdUsuario = jwt_decode(value).id;
            let Nome = jwt_decode(value).nameid;

            setIdUsuario(IdUsuario);
            setNomeUser(Nome);

    })

    const salvar = (event) => {
        event.preventDefault();

        // SetNomeUser();
        if (texto === ""){
            return(
                alert("Não há texto na postagem...")
            )
        }
        else{
            const post = {
                nome : nome,
                urlImagem: urlImagem,
                link : link,
                texto : texto,
                nomeUser: nomeUser,
                curtidas: 0
            }
    
            let method = (idDica === 0 ? 'POST' : 'PUT');
            let urlRequest = (idDica === 0 ? `${url}` : `${url}/${idDica}`);
    
            fetch(urlRequest, {
                method : method,
                body : JSON.stringify(post),
                headers : {
                    'content-type' : 'application/json'
                    // 'authorization' : 'Bearer' + localStorage.getItem('token-edux')
                }
            })
            .then(response => response.json())
            .then(dados => {
                alert('Post salvo com sucesso!');

                fetch('http://localhost:5000/api/Usuario/' + idUsuario, {
                method : 'GET'
                })
                .then(response => response.json())
                .then(dados => {
                    let conquistas = {
                        idUsuario: idUsuario,
                        postagensTotais: Number(dados.postagensTotais) + 1,
                        curtidasTotais: dados.curtidasTotais
                    }
    
                    fetch(`http://localhost:5000/api/Usuario/${idUsuario}`, {
                        method : 'PATCH',
                        body : JSON.stringify(conquistas),
                        headers : {
                            'content-type' : 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(dados => {
                        console.log(dados)
                    });

                })
                .catch(err => console.log(err))

                
                
                listarPosts();
                // setImage(null);
                // setDescricao("");
                limparCampos();
            })
            .catch(err => console.error(err))
        }
        
    }


    const renderItem = ({ item }) => (
        <ItemPost 
        descricao={item.texto} 
        imagem={item.urlImagem} 
        curtidas={ Object.keys(item.curtida).length }
        data={item.data} 
        id={item.idDica} 
        nomeUser={item.nomeUser} 
        idUsuario={idUsuario}
        />
    );

    const uploadFile = async (imagem) => {
        // event.preventDefault();

        let fileToUpload = imagem;

        if(fileToUpload != null){
            const formdata = new FormData();

            formdata.append("arquivo", {
                name: 'image.' + fileToUpload.uri.split('.').pop(),
                type: 'image/' + fileToUpload.uri.split('.').pop(),
                uri:
                    Platform.OS === "android" ? fileToUpload.uri : fileToUpload.uri.replace("file://", "")
            });

            console.log(formdata)


            fetch('http://192.168.15.7:55718/api/Upload', {
                method : 'POST',
                body : formdata,
                headers: {
                    'content-type': 'multipart/form-data'
                }
                
            })
            .then(response => response.json())
            .then(data => {
                console.log('retorno' + data)

                setUrlImagem(data.url);
                console.log('Url: ' + urlImagem)

            })
            .catch(err => console.log('passo mas ta errado ae' + err))
        }else{
            console.log('erro total meu pç')
        }
        

    }

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
        }
      });

    //   const {posts} = this.state;

    return(
        <View>
            <View style={{backgroundColor: 'white'}}>
                <TopBar navigation={navigation} />
                <Text style={{fontSize: 40, alignSelf: 'center', marginTop: 10, fontFamily: 'TitilliumWeb_700Bold', color: '#9200D6'}}>POSTS</Text>
                <TextInput
                    style={[styles.input, {color: '#BEBFBF'}]}
                    onChangeText={text => setTexto(text)}
                    placeholder="Qual sua dica para hoje?"
                    placeholderTextColor="#BEBFBF" 
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity 
                        style={[styles.button, {backgroundColor: 'gray'}]}
                        onPress={pickImage}   
                    >
                        <Text style={[styles.textButton, ]}>Escolher imagem</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, {backgroundColor: '#00D65F'}]}
                        onPress={salvar}>
                        <Text style={[styles.textButton, {fontFamily: 'TitilliumWeb_700Bold'}]}>POSTAR</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    { image ? <Image source={{ uri: image }} style={{ width: 200, height: 200, margin: 15, borderRadius: 3 }}/> : [] }
                </View>
            </View>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                key={index => index}
                style={{backgroundColor: 'white', height: '64%'}}
            />
        </View>

    );
}

export default Postagens;