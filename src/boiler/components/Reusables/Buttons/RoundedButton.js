import React, { Component } from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import { Text } from '../Text/Text';
import { GREEN } from '../../../style/colors';

const RoundedButton = ({onPress, name, disabled, buttonStyle, textStyle}) => {
    return(
        
            <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.9} style={[styles.buttonStyle, buttonStyle]}>
                
                    <Text style={textStyle}>{name}</Text>
              
                
            </TouchableOpacity>
         
    )
}

const styles = {
    buttonStyle: {
    //    borderRadius: 30,
       paddingTop: 13, 
       paddingBottom: 13,
       paddingLeft: 20,
       paddingRight: 20,
       backgroundColor: '#00981E',
       justifyContent: 'center'
    }
}

export {RoundedButton};