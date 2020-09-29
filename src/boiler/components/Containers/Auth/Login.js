import React, { Component } from 'react';
import {ScrollView, NativeModules, Image, View, PermissionsAndroid, ImageBackground, StatusBar, BackHandler} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { LOGO, TRANSAPARENTBACKGROUND, EXTRATRANSAPARENTBACKGROUND } from '../../../style/images';
import { Text, RoundedInput, RoundedButton, UploadButton } from '../../Reusables';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR } from '../../../style/fonts';
import {loginUser, loginUpdate, authenticateUser, logoutUser} from './../../../redux/actions';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import { Actions } from 'react-native-router-flux';
import Splashscreen from 'react-native-splash-screen';
import { UploadedFile } from '../../Reusables/Other/UploadedFile';
import ErrorModal from '../Modals/ErrorModal';
import SuccessModal from '../Modals/SuccessModal';
import RNFS from 'react-native-fs';

class Login extends Component {

    componentWillMount(){
        Splashscreen.hide();
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        const path = RNFS.ExternalStorageDirectoryPath + '/bippiis/bippiis.json';
        RNFS.readFile(path, 'utf8').then(res => {
            let doc = JSON.parse(res);
            // check if status is true
            // delete the file
            RNFS.unlink(path).then(() => {
                this.login(doc.bipplis_no, doc.firebaseToken);
            })  
        }).catch(err => BackHandler.exitApp())
    }

    login(bippiis_number, firebaseToken){
        this.props.loginUser({bippiis_number, firebaseToken, fingerprint: 'varchar'});
    }

    render() {
     
        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                <StatusBar hidden={true}/>
                <ErrorModal/>
               
                {this.props.loginLoading ? <OverlayLoader/> : null}
                <ImageBackground
                    source={EXTRATRANSAPARENTBACKGROUND}
                    style={{width: null, flex: 1, height: null}}
                    resizeMode={'stretch'}
                    resizeMethod={'resize'}
                >

                
                {/* <View style={{alignItems: 'center', marginTop: 50}}>
                    <Image
                        source={LOGO}
                        style={{width: 120, height: 120}}
                        resizeMode={'contain'}
                    />
                    <View style={{alignSelf: 'center', marginTop: 20}}>
                        <Text style={{color: GREEN,textAlign: 'center', fontSize: 14, fontFamily: FONTFAMILYREGULAR}}>BENUE INTEGRATED PAYROLL AND </Text>
                        <Text style={{color: GREEN,textAlign: 'center', fontSize: 14, fontFamily: FONTFAMILYREGULAR}}>PERSONNEL/PENSIONERS INTELLIGENCE</Text>
                        <Text style={{color: GREEN,textAlign: 'center', fontSize: 14, fontFamily: FONTFAMILYREGULAR}}>INFORMATION SYSTEM</Text>
                    </View>
                    
                </View>
                
                <View style={{marginLeft: 20, flex: 1, marginTop: 30, marginRight: 20, justifyContent: 'center'}}>
                    <RoundedInput
                        label={'Enter BIPPIIS Number'}
                        value={this.props.bippiis_number}
                        onChangeText={(value) => this.props.loginUpdate({prop: 'bippiis_number', value})}
                        error={this.props.errors.hasOwnProperty('bippiis_number') ? this.props.errors.bippiis_number[0] : ''}
                    />
                    <RoundedButton
                        name={'Submit'}
                        onPress={() => this.login()}
                        buttonStyle={{marginTop: 25}}
                        textStyle={{textAlign: 'center', color: WHITE, fontSize: 20}}
                    />
                    
                </View> */}
                </ImageBackground>
            </ScrollView>

        );
    }
}

const styles = {

}

const mapStateToProps = (state) => {
    const {bippiis_number} = state.boilerService.auth;
    const {loginLoading} = state.boilerService.loader;
    const {errors} = state.boilerService.error;
    return {bippiis_number, loginLoading, errors}
};

export default connect(mapStateToProps, {loginUser, loginUpdate, authenticateUser, logoutUser})(Login);
