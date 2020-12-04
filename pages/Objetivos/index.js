
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SectionList, TouchableHighlight, _renderTabs } from 'react-native';
import { Card, ListItem, } from 'react-native-elements'

const Objetivos = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [obj, setObj] = useState([])

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

            <View style={styles.container}>

                <Text style={styles.header}> Objetivos</Text>

                <SectionList style={styles.mil}
                    sections={[
                        {
                            title: 'Objetivos principais',
                            data:
                                [' • Entregar todas as lições',
                                    ' • Conquistar nota igual ou maior que 7',
                                    ' • Comparecer em todas as aulas'
                                ]
                        },

                    ]}
                    renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(index) => index} />

                <Card containerStyle={{ padding: 10, borderRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20 }} >
                    <Card.Title>
                        OBJETIVOS CONCLUÍDOS
                    </Card.Title>
                    {
                        obj.map((u, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    title={u.name}
                                />
                            );
                        })
                    }

                </Card>

                <View style={styles.centeredView}>

                    <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.textStyle}>Veja mais!</Text>
                    </TouchableHighlight>
                </View>

            </View>


        </View>

    );
};

const styles = StyleSheet.create({

    header: {
        fontSize: 40,
        marginTop: 40,
        marginBottom: 2,
        textAlign: "center",
        color: "black",
        backgroundColor: "purple",
        fontWeight: "bold",
        fontFamily: 'Titillium Web'
    },
    container: {
        flex: 1,
        backgroundColor: "purple",
        marginBottom: 27,
        marginLeft: 20,
        marginRight: 20,
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

