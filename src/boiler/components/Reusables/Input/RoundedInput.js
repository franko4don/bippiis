import React, { Component } from 'react';
import {View} from 'react-native';
import {WHITE, BLUE, GRAY, RED, SHADOWBLUE, GREEN} from './../../../style/colors';
import { Input, Item } from 'native-base';
import { Text } from '../Text/Text';
import { FONTFAMILYREGULAR } from '../../../style/fonts';

class RoundedInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            borderWidth: 1
        }
    }

    render(){
        const {style, value, error, onBlur, extra, multiline, numberOfLines, placeholder, disabled, keyboardType, onChangeText, children, viewStyle, label, required, placeholderTextColor, maxLength, secureTextEntry, itemStyle} = this.props;
        const {borderWidth} = this.state;

        return(
            <View style={[{marginTop: 10}, viewStyle]}>
                <Text style={{color: '#707070', paddingBottom: 10, fontSize: 16}}>  {label} {required ? <Text style={{color: RED}}>*</Text> : ""}</Text>
                <Item bordered style={[styles.buttonStyle, itemStyle, {borderTopWidth: borderWidth, borderLeftWidth: borderWidth, borderRightWidth: borderWidth, borderBottomWidth: borderWidth}]}>
                    {extra}
                    <Input
                        placeholder={placeholder}
                        style={[{fontSize: 16, color: 'black', fontFamily: FONTFAMILYREGULAR}, style]}
                        maxLength={maxLength}
                        disabled={disabled}
                        value={value}
                        onBlur={() => this.setState({borderWidth: 0.8})}
                        onFocus={() => this.setState({borderWidth: 1.2})}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        keyboardType={keyboardType}
                        placeholderTextColor={placeholderTextColor ? placeholderTextColor : "black"}
                        secureTextEntry={secureTextEntry}
                        onChangeText={onChangeText}
                    />
                    
                    {children}
                </Item>
                <Text style={{color: RED, textAlign: 'right', fontSize: 11, paddingTop: 5, paddingRight: 10}}>  {error}</Text>
            </View>
    )
    }
}


const styles = {
    buttonStyle: {
        borderColor: '#00981E', 
        height: 50,
        elevation: 0,
        backgroundColor: '#F9FAFF'
    }
}

export {RoundedInput};