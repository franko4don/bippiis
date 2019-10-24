import React, { Component } from 'react';
import {ScrollView, NativeModules, Image, View, ImageBackground, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { LOGO, TRANSAPARENTBACKGROUND, EXTRATRANSAPARENTBACKGROUND } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import {loginUpdate, createPassword} from './../../../redux/actions';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR } from '../../../style/fonts';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import { Actions } from 'react-native-router-flux';

class CreatePassword extends Component {

    submit(){
        const {bippiis_number, password, password_confirmation} = this.props;
        this.props.createPassword({
            bippiis_number, password, password_confirmation
        });
    }

    render() {
     
        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                <StatusBar hidden={true}/>
                
                
                <ImageBackground
                    source={EXTRATRANSAPARENTBACKGROUND}
                    style={{width: null, flex: 1, height: null}}
                    resizeMode={'stretch'}
                    resizeMethod={'resize'}
                >

                
                <View style={{alignItems: 'center', marginTop: 50}}>
                    <Image
                        source={LOGO}
                        style={{width: 120, height: 120}}
                        resizeMode={'contain'}
                    />
                 
                </View>
                
                <View style={{marginLeft: 20, flex: 1, marginTop: 30, marginRight: 20, justifyContent: 'center'}}>
                    <RoundedInput
                        label={'Enter Password'}
                        value={this.props.password}
                        secureTextEntry={true}
                        onChangeText={(value) => this.props.loginUpdate({prop: 'password', value})}
                    />
                    <RoundedInput
                        label={'Confirm Password'}
                        secureTextEntry={true}
                        value={this.props.password_confirmation}
                        onChangeText={(value) => this.props.loginUpdate({prop: 'password_confirmation', value})}
                    />
                    <RoundedButton
                        name={'Submit'}
                        onPress={() => this.submit()}
                        buttonStyle={{marginTop: 25}}
                        textStyle={{textAlign: 'center', color: WHITE, fontSize: 20}}
                    />
                </View>
                </ImageBackground>
            </ScrollView>

        );
    }
}

const styles = {

}

const mapStateToProps = (state) => {
    const {bippiis_number, password, password_confirmation} = state.boilerService.auth;
    const {loginLoading} = state.boilerService.loader;
    return {bippiis_number, loginLoading, password, password_confirmation}
};

export default connect(mapStateToProps, {loginUpdate, createPassword})(CreatePassword);
