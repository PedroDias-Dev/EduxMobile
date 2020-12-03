import { apisAreAvailable } from "expo";
import React, { useState } from "react";
import {Alert,Modal,StyleSheet,Text,TouchableHighlight, View, SectionList, ViewBase} from "react-native";
import { color } from "react-native-reanimated";
import TopBar from "../../components/TopBar";



const Turmas = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (

    
    
    <View style={styles.container}>
    <TopBar navigation={navigation} />

    
    <Text style={styles.header }>     EduX - Turmas</Text>

    <SectionList style={styles.mil}
      sections={[
        {title: 'Ensino Fundamental', 
        data: [' • 1°Ano - Ensino Fundamental',
         ' • 2°Ano - Ensino Fundamental',
         ' • 3°Ano - Ensino Fundamental',
         ' • 4°Ano - Ensino Fundamental',
         ' • 5°Ano - Ensino Fundamental',
         ' • 6°Ano - Ensino Fundamental',
         ' • 7°Ano - Ensino Fundamental',
         ' • 8°Ano - Ensino Fundamental',
         ' • 9°Ano - Ensino Fundamental',
        ]},
        {title: 'Ensino Médio', 
        data: [' • 1°Ano - Ensino Médio', 
        ' • 2°Ano - Ensino Médio', 
        ' • 3°Ano - Ensino Médio', 
      ]},
      ]}
      renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
      renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
      keyExtractor={(item, index) => index}
    />
 

    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>O Ensino da Escola EduX é conhecida mundialmente!             Nós garantimos todos os anos escolares para os alunos. </Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#9200d6" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

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
   
    


  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    marginTop:45,
    marginBottom: 2,
    backgroundColor: '#9200d6',
    color: "white",
    borderRadius: 65,
  },

 
  container: {
    flex: 1,
    marginBottom:27,
    backgroundColor:"white",
    // marginLeft:20,
    // marginRight:20
   },
   
   sectionHeader: {
     paddingTop: 20,
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
    marginTop: 2
  },
  modalView: {
    margin: 20,
    backgroundColor:'white',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#9200d6",
    borderRadius: 65,
    padding: 12,
    elevation: 2,
  
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,

  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 17

  }
});

export default Turmas;