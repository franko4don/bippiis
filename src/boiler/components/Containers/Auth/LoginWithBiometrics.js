import React, { Component } from 'react';
import {ScrollView, NativeModules, Image, View, DeviceEventEmitter, ImageBackground, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { LOGO, TRANSAPARENTBACKGROUND, EXTRATRANSAPARENTBACKGROUND } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import {loginUpdate, loginUser, loginWithBiometrics} from './../../../redux/actions';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR } from '../../../style/fonts';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import { Actions } from 'react-native-router-flux';
const { Biometrics } = NativeModules;

class LoginWithBiometrics extends Component {

    submit(){
        const {bippiis_number, password} = this.props;
        this.props.loginUser({
            bippiis_number, password
        });
    }

    componentWillMount(){
        // this.props.loginUpdate({prop: 'password', value: ''});
        Biometrics.startLoginBiometrics(this.props.bippiis_number);
        DeviceEventEmitter.addListener('onFingerPrintVerified', (e) => {
            // make call to server
            const {bippiis_number} = this.props;

            this.props.loginWithBiometrics({
                bippiis_number, 
                fingerprint: true
            });

            console.log(e, "Login Complete");
        });
    }

    componentWillUnmount(){
        DeviceEventEmitter.removeListener('onFingerPrintVerified');
    }

    render() {
     
        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                <StatusBar hidden={true}/>
                {this.props.loginLoading ? <OverlayLoader/> : null}
            </ScrollView>

        );
    }
}

const styles = {

}

const mapStateToProps = (state) => {
    const {bippiis_number, password} = state.boilerService.auth;
    const {loginLoading} = state.boilerService.loader;
    const {errors} = state.boilerService.error;
    return {bippiis_number, loginLoading, errors, password}
};

export default connect(mapStateToProps, {loginUpdate, loginUser, loginWithBiometrics})(LoginWithBiometrics);
