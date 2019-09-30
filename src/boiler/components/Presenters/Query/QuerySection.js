import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ICONCHEVRON } from '../../../style/images';
import { Card, Text } from '../../Reusables';
import { WHITE, BLUE, SHADOWBLUE, SHADOWBLUEBORDER } from '../../../style/colors';
import { FONTFAMILYREGULAR, FONTFAMILYSEMIBOLD } from '../../../../fonts';
import { calculateOpacity, truncateText } from '../../../../Helper';

const QuerySection = (props) => {
    const { name, image, onPress } = props;

    return (
        <TouchableOpacity style={styles.cardStyle} onPress={onPress} activeOpacity={0.9}>
            <View style={{padding: 5, paddingLeft: 10, paddingRight: 30, justifyContent: 'center'}}>
                <Text style={{color: '#333333'+calculateOpacity(80), paddingTop: 3, paddingBottom: 1, fontSize: 12}}>21st May, 2017</Text>
                <Text style={{color: '#333333', fontWeight: 'bold', paddingBottom: 3,  fontSize: 18}}>Job Abscence</Text>
                <Text style={{color: '#333333'+calculateOpacity(80), fontSize: 12}}>{truncateText(120, 'Absence from work without prior permission from authority')}</Text>
                 
            </View>
            <View style={{justifyContent: 'center'}}>
                <Image
                    source={ICONCHEVRON}
                    style={{width: 15, height: 15, marginRight: 5}}
                    resizeMode={'contain'}
                />
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
        elevation: 0.8,
        paddingTop: 5,
        paddingBottom: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 3,
        flex: 0,
        marginTop: 5,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 0 },
        
    },

    textStyle:{
        color: BLUE,
        fontSize: 14,
        paddingBottom: 3
    }

})

export { QuerySection };
