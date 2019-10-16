import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, ImageBackground, Alert, Image, View, StatusBar, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { HIS, ICONIDCARD } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR, FONTFAMILYSEMIBOLD } from '../../../style/fonts';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import SuccessModal from '../Modals/SuccessModal';
import {applyForId} from './../../../redux/actions';
import moment from 'moment';

class StaffId extends Component {

    apply(){
        Alert.alert(
            'Are you sure?',
            'Apply for Staff ID Card', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => this.props.applyForId()
            },], {
                cancelable: false
            }
        )
        
    }


    render() {
        const {width, height} = Dimensions.get('screen');
        const {civil_servants} = this.props.user;
        
        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                {this.props.idLoading ? <OverlayLoader/>: null}
                <StatusBar backgroundColor={WHITE} translucent={false} barStyle={'dark-content'} />
                <View style={{padding: 10, paddingTop: 50}}>

                    <SuccessModal 
                        print={true} 
                        time={moment().format('ddd Do MMM, YYYY - hh:ss A')} 
                        staffName={civil_servants.surname +' '+ civil_servants.first_name} 
                        operation={'IdCard Request'} 
                        bippiis_number={civil_servants.bippiis_number}  
                        message={'You have successfully applied for Id Card'} 
                       
                    />
                     <Image
                        source={ICONIDCARD}
                        style={{width: 100, height: 100, alignSelf: 'center'}}
                        resizeMode={'contain'}
                     />
                     <View style={{marginTop: 10}}>
                        <Text style={{color: '#333333', textAlign: 'center', fontSize: 24, marginBottom: 25}}>Apply for ID Card</Text>
                        <Text style={{color: '#707070', textAlign: 'center', fontSize: 18, marginBottom: 15}}>
                            Would you like to apply for Benue State ID Card?
                        </Text>
                     </View>

                     <RoundedButton
                        name={'Apply Now'}
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
    const {idLoading} = state.boilerService.loader;
    const {user} = state.boilerService.auth;
    return {idLoading, user}
};

export default connect(mapStateToProps, {applyForId})(StaffId);
