import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, ImageBackground, Alert, Image, View, StatusBar, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { HIS } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR, FONTFAMILYSEMIBOLD } from '../../../style/fonts';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import SuccessModal from '../Modals/SuccessModal';
import {applyForInsurance} from './../../../redux/actions';

class Insurance extends Component {

    apply(){
        Alert.alert(
            'Are you sure?',
            'Apply for Health Insurance Scheme', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => this.props.applyForInsurance()
            },], {
                cancelable: false
            }
        )
        
    }


    render() {
        const {width, height} = Dimensions.get('screen');

        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                {this.props.insuranceLoading ? <OverlayLoader/>: null}
                <StatusBar backgroundColor={WHITE} translucent={false} barStyle={'dark-content'} />
                <View style={{padding: 10, paddingTop: 50}}>
                    <SuccessModal message={'You have successfully enrolled for health insurance'}/>
                     <Image
                        source={HIS}
                        style={{width: 150, height: 150, alignSelf: 'center'}}
                        resizeMode={'contain'}
                     />
                     <View style={{marginTop: 10}}>
                        <Text style={{color: '#333333', textAlign: 'center', fontSize: 24, marginBottom: 25}}>Enroll for Insurance</Text>
                        <Text style={{color: '#707070', textAlign: 'center', fontSize: 18, marginBottom: 15}}>
                            Would you like to apply to enroll for health insurance scheme with NHIS?
                        </Text>
                     </View>

                     <RoundedButton
                        name={'Apply for Insurance'}
                        onPress={() => this.apply()}
                        buttonStyle={{marginTop: 55}}
                        textStyle={{textAlign: 'center', color: WHITE, fontSize: 20}}
                    />
                     
                </View>
                 
            </ScrollView>

        );
    }
}

const styles = {

}

const mapStateToProps = (state) => {
    const {insuranceLoading} = state.boilerService.loader;
    return {insuranceLoading}
};

export default connect(mapStateToProps, {applyForInsurance})(Insurance);
