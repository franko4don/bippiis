import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, ImageBackground, TouchableOpacity, Image, View, StatusBar, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { LOGO, ICONBIOMETRICS, ICONFACECAPTURE, ICONPROFILE, ICONPROFILEUPDATE, ICONFINANCIALREPORT, TRANSAPARENTBACKGROUND, GOVERNOR, ICONHEALTH, ICONATTENDANCE, ICONIDCARD, ICONVERIFICATION } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR, FONTFAMILYSEMIBOLD } from '../../../style/fonts';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import { HomeSection } from '../../Presenters/Home/HomeSection';
import { calculateOpacity } from '../../../../Helper';
import { Actions } from 'react-native-router-flux';
import { LeaveSection } from '../../Presenters/Leave/LeaveSection';


class Leave extends Component {

    render() {
        const {width, height} = Dimensions.get('screen');

        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                <StatusBar translucent={true} backgroundColor={'transparent'}/>
                <View style={{padding: 10, paddingTop: 30}}>
                    <TouchableOpacity style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
                        <View style={{justifyContent: 'center'}}>
                        <MaterialCommunityIcon name={'plus-circle-outline'} color={'#0AAF2C'} size={22}/>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{color: '#0AAF2C', marginLeft: 10, fontSize: 15}}>Apply for Leave</Text>
                        </View>
                    
                    </TouchableOpacity>
                    <Text style={{color: '#707070', fontSize: 25, marginTop: 20, marginBottom: 15}}>Active</Text>
                    <LeaveSection/> 
                    <LeaveSection/> 
                    <LeaveSection/> 
                </View>
                 
            </ScrollView>

        );
    }
}

const styles = {

}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, {})(Leave);
