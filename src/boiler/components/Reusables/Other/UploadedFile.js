import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from './../Text/Text';
import { WHITE } from '../../../style/colors';
import { FONTFAMILYREGULAR } from '../../../../fonts';
import { FONTFAMILYLIGHT } from '../../../style/fonts';

const UploadedFile = ({filename, mime}) => {
    return(
    <View activeOpacity={0.93} style={styles.buttonStyle}>
        <View style={{padding: 13, justifyContent: 'center', backgroundColor: '#707070'}}>
            <Text style={{textAlign: 'center', color: WHITE}}> {mime.toUpperCase()} </Text>
        </View>
        <View style={{flex: 1, paddingLeft: 10}}>
            <Text style={{color: '#707070', paddingBottom: 5, fontSize: 18}}>{filename}</Text>
            <View style={{height: 3, backgroundColor: '#0AAF2C'}}></View>
            <Text style={{color: '#707070', paddingTop: 3, fontFamily: FONTFAMILYLIGHT, paddingBottom: 5, fontSize: 15}}>100% done</Text>
        </View>
        
        
    </View>)
}


const styles = {
    buttonStyle: {
       flexDirection: 'row',
       marginTop: 15,
    }
}


export {UploadedFile}