import React, { Component } from 'react';
import {ScrollView, NativeModules, Image, View, ImageBackground, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { LOGO, TRANSAPARENTBACKGROUND, EXTRATRANSAPARENTBACKGROUND } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR } from '../../../style/fonts';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import { Actions } from 'react-native-router-flux';
import Splashscreen from 'react-native-splash-screen';

class Login extends Component {

    componentWillMount(){
        setTimeout(() => {
            Splashscreen.hide();
        }, 10000)
        
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
                    <View style={{alignSelf: 'center', marginTop: 20}}>
                        <Text style={{color: GREEN,textAlign: 'center', fontSize: 14, fontFamily: FONTFAMILYREGULAR}}>BENUE INTEGRATED PAYROLL AND </Text>
                        <Text style={{color: GREEN,textAlign: 'center', fontSize: 14, fontFamily: FONTFAMILYREGULAR}}>PERSONNEL/PENSIONERS INTELLIGENCE</Text>
                        <Text style={{color: GREEN,textAlign: 'center', fontSize: 14, fontFamily: FONTFAMILYREGULAR}}>INFORMATION SYSTEM</Text>
                    </View>
                    
                </View>
                
                <View style={{marginLeft: 20, flex: 1, marginTop: 30, marginRight: 20, justifyContent: 'center'}}>
                    <RoundedInput
                        label={'Enter BIPPIIS Number'}
                        
                    />
                    <RoundedButton
                        name={'Submit'}
                        onPress={() => Actions.reset('home')}
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
    return {}
};

export default connect(mapStateToProps, {})(Login);
