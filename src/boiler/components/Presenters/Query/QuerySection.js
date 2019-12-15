import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ICONCHEVRON } from '../../../style/images';
import { Card, Text } from '../../Reusables';
import { WHITE, BLUE, SHADOWBLUE, SHADOWBLUEBORDER } from '../../../style/colors';
import { FONTFAMILYREGULAR, FONTFAMILYSEMIBOLD } from '../../../../fonts';
import { calculateOpacity, truncateText } from '../../../../Helper';

const QuerySection = (props) => {
    const { name, image, onPress, reason, bippiis_number, date } = props;

    return (
        <TouchableOpacity style={styles.cardStyle} onPress={onPress} activeOpacity={0.9}>
            <View style={{padding: 5, paddingLeft: 10, paddingRight: 30, justifyContent: 'center'}}>
                <Text style={{color: '#333333'+calculateOpacity(80), paddingTop: 3, paddingBottom: 1, fontSize: 12}}>{date}</Text>
                <Text style={{color: '#333333', fontFamily: FONTFAMILYSEMIBOLD, paddingBottom: 3,  fontSize: 17}}>{reason}</Text>
                <Text style={{color: '#333333'+calculateOpacity(80), fontSize: 12}}>{truncateText(120, bippiis_number)}</Text>
                 
            </View>
            <View style={{justifyContent: 'center' }}>
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
        elevation: 3,
        paddingTop: 5,
        paddingBottom: 10,
        paddingRight: 20,
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
