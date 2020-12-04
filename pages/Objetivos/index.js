// PROJETO EDUX
// 11 E 12/2020
// MAKOTO

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SectionList, TouchableHighlight, _renderTabs } from 'react-native';
import { Card, ListItem, } from 'react-native-elements'
import TopBar from "../../components/TopBar";

const Objetivos = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const list = [
        {
            name: 'Principais',
           
            subtitle: 'Entregar todas as atividades',

            subtitle: 'Participar das aulas',
            
            subtitle: 'Comparecer em todas as aulas'
        },
        {
            name: 'Secundários',
            
            subtitle: 'Concluir todos os objetivos principais'
        },
    ]


    useEffect(() => {
        listar();
    }, [])

    let url = 'https://192.168.0.20:5000/api/objetivos';

    const listar = () => {
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(dados => {
                setObj((dados.data));
                limparCampos();
            })
            .catch(err => console.log(err))
    }



    return (
        <View style={styles.body}>
            <TopBar navigation={navigation} />

            <Text style={styles.header}> Objetivos</Text>

            <SectionList style={styles.mil}
                sections={[
                    {
                        title: 'Principais',
                        data: [' • Comparecer em todas as aulas',
                            ' • Entregar todas as atividades',
                            ' • Participar das aulas',
                        ]
                    },
                    {
                        title: 'Secundários ',
                        data: [' • Concluir todos os objetivos principais', ]
                    },
                ]}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />

            <Card containerStyle={{ padding: 10, borderRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20 }} >
                <Card.Title>
                    OBJETIVOS CONCLUÍDOS
                    </Card.Title>
                {
                    list.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }

            </Card>

        </View>

    );
};

const styles = StyleSheet.create({

    header: {
        fontSize: 40,
        marginTop: 40,
        marginBottom: 2,
        textAlign: "center",
        color: "#9200d6",
        fontWeight: "bold",
        fontFamily: 'TitilliumWeb_400Regular'
    },
    sectionHeader: {
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 4,
        fontSize: 25,
        fontWeight: 'bold',
    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 44,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 20
    },
    openButton: {
        backgroundColor: "#222222",
        borderRadius: 65,
        padding: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
        borderRadius: 20,
        padding: 5
    },
});

export default Objetivos;

