import React, { Component } from 'react';
import {ScrollView, NativeModules, DeviceEventEmitter, Image, View, ImageBackground, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { LOGO, TRANSAPARENTBACKGROUND, EXTRATRANSAPARENTBACKGROUND } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import {loginUpdate, loginUser, enrollUserBiometrics} from './../../../redux/actions';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR } from '../../../style/fonts';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import { Actions } from 'react-native-router-flux';
const { Biometrics } = NativeModules;

class EnrolBiometrics extends Component {

    constructor(props){
        super(props);

        this.state = {

            fingerprints: {}
        }
    }

    submit(){
        const {bippiis_number, password} = this.props;
        this.props.loginUser({
            bippiis_number, password
        });
    }

    componentWillMount(){
        // this.props.loginUpdate({prop: 'password', value: ''});
        Biometrics.startEnrolBiometrics(this.props.bippiis_number);
        DeviceEventEmitter.addListener('onEnrollmentComplete', (e) => {
            // make call to server
            const {bippiis_number} = this.props;

            this.props.enrollUserBiometrics({
                bippiis_number, 
                fingerprints: Object.values(this.state.fingerprints)
            });

            console.log(e, "Enrolment Complete");
        });
        DeviceEventEmitter.addListener('onFingerPrintSaveComplete', async (filename) => {
            console.log(filename, "File saved");
            if(!this.state.fingerprints.filename){
                let result = await RNFS.readFile(filename, 'base64');
                if(result){
                    let fingerprints = this.state.fingerprints;
                    fingerprints[filename] = result;
                    this.setState({fingerprints})
                }
            }
        });
    }

    componentWillUnmount(){
        DeviceEventEmitter.removeListener('onEnrollmentComplete');
        DeviceEventEmitter.removeListener('onFingerPrintSaveComplete');
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

export default connect(mapStateToProps, {loginUpdate, enrollUserBiometrics, loginUser})(EnrolBiometrics);
