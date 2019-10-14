import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from './../Text/Text';

const UploadButton = () => {
    return(
    <TouchableOpacity activeOpacity={0.93} style={styles.buttonStyle}>
        <MaterialCommunityIcon style={{alignSelf: 'center'}} color={'#0AAF2C'} name="cloud-upload" size={48} />
        <Text style={{textAlign: 'center', color: '#0AAF2C', paddingBottom: 5, fontSize: 18, marginTop: 5}}>Upload Document</Text>
    </TouchableOpacity>)
}


const styles = {
    buttonStyle: {
        borderWidth: 1,
        borderRadius: 0.3,
        borderColor: '#0AAF2C',
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 15,
        marginBottom: 15
    }
}


export {UploadButton}