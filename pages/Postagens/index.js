import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemPost from '../../components/ItemPost';
import TopBar from '../../components/TopBar';

import Turmas from '../Turmas';

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
    }

    const salvar = (event) => {
        event.preventDefault();

        SetNomeUser();

        const post = {
            nome : nome,
            urlImagem :urlImagem,
            link : link,
            descricao : descricao,
            nomeUser: nomeUser
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
        })
        .catch(err => console.error(err))
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
        <ItemPost nome={item.nome} imagem={item.urlImagem} link={item.link} />
      );

    //   const Tab = createBottomTabNavigator();

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#F7F7F7',
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
        },
        input : {
            width: '80%',
            height: 40, 
            borderColor: 'gray', 
            borderWidth: 1,
            marginTop : 20,
            padding: 5,
            borderRadius: 6,
            alignSelf: 'center'
        },
        textButton : {
            color : 'white'
        }
      });

    return(
        <View >
            <TopBar />
            <Text style={{fontSize: 40, alignSelf: 'center', marginTop: 10}}>POSTS</Text>

            <TextInput
                style={styles.input}
                // onChangeText={text => setNome(text)}
                // value={nome}
                placeholder="Qual sua dica para hoje?"
            />

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TouchableOpacity style={[styles.button, {backgroundColor: 'gray'}]}>
                    <Text style={[styles.textButton, ]}>Escolher imagem</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {backgroundColor: 'green'}]}>
                    <Text style={styles.textButton}>POSTAR</Text>
                </TouchableOpacity>
            </View>
            
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            {/* <BottomTab /> */}

            {/* <Tab.Navigator>
                <Tab.Screen name="Postagens" component={Postagens} />
                <Tab.Screen name="Turmas" component={Turmas} />
            </Tab.Navigator> */}
        </View>

    );
}

export default Postagens;