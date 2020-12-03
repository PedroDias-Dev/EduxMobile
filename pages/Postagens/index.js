import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, Platform } from 'react-native';

import ItemPost from '../../components/ItemPost';
import TopBar from '../../components/TopBar';

import * as ImagePicker from 'expo-image-picker';

const Postagens = ( {navigation} ) => {
    //let url = 'http://localhost:57332'
    let url = 'https://5f7f873fd6aabe00166f06be.mockapi.io/nyous/edux'

    const [ id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [link, setLink] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [nomeUser, setNomeUser] = useState('');
    const [posts, setPost] = useState([]);
    const [cursoId, setCursoId] = useState('');
    const [cursos, setCursos] = useState([]);

    // NAME POLICIES
    const [show, setShow] = useState(false);
    const target = useRef(null);

    //IMAGE
    const [image, setImage] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //     if (Platform.OS !== 'web') {
    //         const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    //         if (status !== 'granted') {
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //     }
    //     })();
    // }, []);
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
    
        if (!result.cancelled) {
          setImage(result.uri);
          console.log(result.uri)
        }
    };

    //AUTOMATIC SCROLL
    const myRef = useRef(null)
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
    const executeScroll = () => scrollToRef(myRef)

    //NOME DE USUARIO
    // const token = localStorage.getItem('token-edux');

    // const SetNomeUser = () =>{
    //     //const token = localStorage.getItem('token-edux');
    //     setNomeUser((jwt_decode(token).nameid));

    //     console.log(nomeUser);
    // }


    useEffect(() => {
        listarPosts();
        
    }, []);

    const listarCursos = () => {
        fetch('http://localhost:62602/api/Cursos')
            .then(response => response.json())
            .then(data => {
                setCursos(data)
                limparCampos();
            })
            .catch(err => console.error(err));
    }

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

    const limparCampos = () => {
        setId(0);
        setNome('');
        setLink('');
        setUrlImagem('');
        setDescricao('');
        setNomeUser('');
        setCursoId(0);
        setImage(null);
    }

    const salvar = (event) => {
        event.preventDefault();

        // SetNomeUser();
        if (descricao === ""){
            return(
                alert("Não há texto na postagem...")
            )
        }
        else{
            const post = {
                nome : nome,
                urlImagem: image,
                link : link,
                descricao : descricao,
                // nomeUser: nomeUser,
                nomeUser: 'Xxpedrinho_gamerxX',
                curtidas: 0
            }
    
            let method = (id === 0 ? 'POST' : 'PUT');
            let urlRequest = (id === 0 ? `${url}` : `${url}/${id}`);
    
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
    
                listarPosts();
                // setImage(null);
                // setDescricao("");
                limparCampos();
                text = ""
            })
            .catch(err => console.error(err))
        }
        
    }

    const editar = (event) => {
        event.preventDefault();
        executeScroll();

        console.log('A')

        fetch(`${url}/${event.target.value}`, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);

            setId(dado.id);
            setNome(dado.nome);
            setLink(dado.link);
            setUrlImagem(dado.urlImagem);
            setDescricao(dado.descricao);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(`${url}/${event.target.value}`,{
            method : 'DELETE',
            // headers : {
            //     'authorization' : 'Bearer' + localStorage.getItem('token-edux')
            // }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Post Apagado com sucesso!');

            listarPosts();
        })
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

    function EditarRemover(item){

        if((jwt_decode(token).nameid) === item.nomeUser){
            return(
                <div style={{justifyContent: 'space-around'}}>
                <Button type="button" variant="warning" value={item.id} onClick={ event => editar(event)}>Editar</Button>
                <Button type="button" variant="danger" value={item.id} style={{ marginLeft : '30px'}} onClick={ event => remover(event)}>Remover</Button>
                </div>
        )
        }
    }

    const renderItem = ({ item }) => (
        <ItemPost descricao={item.descricao} imagem={item.urlImagem} curtidas={item.curtidas} data={item.data} id={item.id} nomeUser={item.nomeUser}/>
      );

    //   const Tab = createBottomTabNavigator();

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

    return(
        <View >
            <View style={{backgroundColor: 'white'}}>
                <TopBar navigation={navigation} />
                <Text style={{fontSize: 40, alignSelf: 'center', marginTop: 10, fontFamily: 'TitilliumWeb_700Bold', color: '#9200D6'}}>POSTS</Text>

                <TextInput
                    style={[styles.input, {color: '#BEBFBF'}]}
                    onChangeText={text => setDescricao(text)}
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
                <View style={{backgroundColor: 'white', justifyContent: "center", alignItems: 'center', }}>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, margin: 15, borderRadius: 3 }} />}
                </View>
            </View>
            
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{backgroundColor: 'white'}}
            />
            
        </View>

    );
}

export default Postagens;