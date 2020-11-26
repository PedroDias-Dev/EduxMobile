import React from 'react';
import { StyleSheet, Text, View,ListGroup } from 'react-native';

const Turmas = () => { 
    return(
        <View style= {styles.container}>
            <Text >Turmas</Text>   
            <ListGroup variant="flush">
            <ListGroup.Item>1°Ano - Ensino Fundamental</ListGroup.Item>
            <ListGroup.Item>2°Ano - Ensino Fundamental</ListGroup.Item>
            <ListGroup.Item>3°Ano - Ensino Fundamental</ListGroup.Item>
            <ListGroup.Item>4°Ano - Ensino Fundamental</ListGroup.Item>
            <ListGroup.Item>5°Ano - Ensino Fundamental</ListGroup.Item>
            <ListGroup.Item>6°Ano - Ensino Fundamental</ListGroup.Item>
            <ListGroup.Item>7°Ano - Ensino Fundamental</ListGroup.Item>
            <ListGroup.Item>9°Ano - Ensino Fundamental</ListGroup.Item>
            <ListGroup.Item>1°Ano - Ensino Médio</ListGroup.Item>
            <ListGroup.Item>2°Ano - Ensino Médio</ListGroup.Item>
            <ListGroup.Item>3°Ano - Ensino Médio</ListGroup.Item>
            </ListGroup>       
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'White',
      alignItems: 'center',
      justifyContent: 'center',
    },
   
  });

export default Turmas;