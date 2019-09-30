import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ICONCHEVRON } from '../../../style/images';
import { Card, Text } from '../../Reusables';
import { WHITE, BLUE, SHADOWBLUE, SHADOWBLUEBORDER } from '../../../style/colors';
import { FONTFAMILYREGULAR } from '../../../../fonts';
import { calculateOpacity } from '../../../../Helper';

const HomeSection = (props) => {
    const { name, image, onPress } = props;

    return (
        <TouchableOpacity style={styles.cardStyle} onPress={onPress} activeOpacity={0.8}>
            <View style={{padding: 10}}>
                <Image
                    source={image}
                    style={{width: 40, height: 40, alignSelf: 'center'}}
                    resizeMode={'contain'}
                />
                
                <Text style={{color: '#363636', paddingTop: 10, paddingBottom: 15, textAlign: 'center', fontSize: 13}}>{name}</Text>
                 
            </View>
                    
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({

    cardStyle:{
        
        backgroundColor: WHITE,
        borderRadius: 10,
        borderColor: '#000000'+calculateOpacity(12),
        borderWidth: 0.3,
        elevation: 4,
        // padding: 20,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        flex: 1,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 0 },
        
    },

    textStyle:{
        color: BLUE,
        fontSize: 14,
        paddingBottom: 3
    }

})

export { HomeSection };
