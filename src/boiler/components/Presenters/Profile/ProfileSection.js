import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ICONCHEVRON } from '../../../style/images';
import { Card, Text } from '../../Reusables';
import { WHITE, BLUE, SHADOWBLUE, SHADOWBLUEBORDER } from '../../../style/colors';
import { FONTFAMILYREGULAR } from '../../../../fonts';
import { calculateOpacity, isNumeric } from '../../../../Helper';

const processData = (data) =>{
    if(data){
        if(isNumeric(data)){
            return data;
        }else{
            if(data.length > 0){
                return data;
            }else{
                return 'Nil';
            }
        }
    }else{
        return 'Nil'
    }
}

const ProfileSection = (props) => {
    const { label, data } = props;

    return (
        <View style={styles.cardStyle}>
           
           <Text style={{color: '#333333'+calculateOpacity(75)}}>{label}</Text>
           <View style={{ marginTop: 5, justifyContent: 'center',borderBottomWidth: 2, borderColor: '#DCDCDC', paddingTop: 3, borderRadius: 3}}>
                <Text style={{color: '#333333', padding: 5 }}>
                    {processData(data)}
                </Text>
            </View>         
        </View>
    );
};


const styles = StyleSheet.create({

    cardStyle:{
       marginBottom: 15,
        
    },

    textStyle:{
       
    }

})

export { ProfileSection };
