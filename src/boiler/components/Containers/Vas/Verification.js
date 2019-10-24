import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, ImageBackground, Image, View, StatusBar, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { HIS } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR, FONTFAMILYSEMIBOLD } from '../../../style/fonts';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import SuccessModal from '../Modals/SuccessModal';
import {verify} from './../../../redux/actions';
import moment from 'moment';
import CalenderIcon from '../../../assets/svgs/CalenderIcon';

class Verification extends Component {

    mark(){
        this.props.verify();
    }

    getName(){
        const {user} = this.props;
        if(user.category == 1){
            return user.civil_servants.surname +' '+ user.civil_servants.first_name
        }else{
            return user.lga_pensioners.fullname
        }
    }

    render() {
        const {width, height} = Dimensions.get('screen');
        const {user} = this.props;

        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                {this.props.attendanceLoading ? <OverlayLoader/>: null}
                <StatusBar backgroundColor={WHITE} translucent={false} barStyle={'dark-content'} />
                <View style={{padding: 10, paddingTop: 50}}>
                   
                    <SuccessModal 
                        print={true} 
                        time={moment().format('ddd Do MMM, YYYY - hh:ss A')} 
                        staffName={this.getName()} 
                        operation={'Attendance'} 
                        bippiis_number={user.bippiis_number}  
                        message={'You have successfully verified'} 
                       
                    />
                     <CalenderIcon/>
                     <View style={{marginTop: 25}}>
                        <Text style={{color: '#333333', textAlign: 'center', fontSize: 24, marginBottom: 25}}>Verify Your Account</Text>
                        <Text style={{color: '#707070', textAlign: 'center', fontSize: 18, marginBottom: 15}}>
                            Click on verify to complete verification.
                        </Text>
                     </View>

                     <RoundedButton
                        name={'Verify'}
                        onPress={() => this.mark()}
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
    const {attendanceLoading} = state.boilerService.loader;
    const {user} = state.boilerService.auth;
    return {attendanceLoading, user}
};

export default connect(mapStateToProps, {verify})(Verification);
