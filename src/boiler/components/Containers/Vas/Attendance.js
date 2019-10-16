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
import {markAttendance} from './../../../redux/actions';
import moment from 'moment';
import CalenderIcon from '../../../assets/svgs/CalenderIcon';

class Attendance extends Component {

    mark(){
        this.props.markAttendance();
    }


    render() {
        const {width, height} = Dimensions.get('screen');
        const {civil_servants} = this.props.user;

        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                {this.props.attendanceLoading ? <OverlayLoader/>: null}
                <StatusBar backgroundColor={WHITE} translucent={false} barStyle={'dark-content'} />
                <View style={{padding: 10, paddingTop: 50}}>
                   
                    <SuccessModal 
                        print={true} 
                        time={moment().format('ddd Do MMM, YYYY - hh:ss A')} 
                        staffName={civil_servants.surname +' '+ civil_servants.first_name} 
                        operation={'Attendance'} 
                        bippiis_number={civil_servants.bippiis_number}  
                        message={'You have successfully marked Attendance for Today'} 
                       
                    />
                     <CalenderIcon/>
                     <View style={{marginTop: 25}}>
                        <Text style={{color: '#333333', textAlign: 'center', fontSize: 24, marginBottom: 25}}>Mark Today's Attendance</Text>
                        <Text style={{color: '#707070', textAlign: 'center', fontSize: 18, marginBottom: 15}}>
                            Click on mark attendance to mark attendance for today.
                        </Text>
                     </View>

                     <RoundedButton
                        name={'Mark Attendance'}
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

export default connect(mapStateToProps, {markAttendance})(Attendance);
