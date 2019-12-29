import React, { Component } from 'react';
import {ScrollView, NativeModules, Image, View, ImageBackground, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { LOGO, TRANSAPARENTBACKGROUND, EXTRATRANSAPARENTBACKGROUND } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import {loginUpdate, loginUser} from './../../../redux/actions';
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
    }

    render() {
     
        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                <StatusBar hidden={true}/>
                
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

export default connect(mapStateToProps, {loginUpdate, loginUser})(LoginWithBiometrics);
