import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Icon } from 'react-native-elements'

const TopBar = () => {
    return(
        <View style={{backgroundColor: 'black', height: 45, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 17}}>
                <Text style={{color: 'white'}}>EDUX</Text>
                <TouchableOpacity>
                    <Text style={{color: 'white'}}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default TopBar;