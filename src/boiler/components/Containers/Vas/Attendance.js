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

class Attendance extends Component {

    mark(){
        this.props.markAttendance();
    }


    render() {
        const {width, height} = Dimensions.get('screen');

        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                {this.props.attendanceLoading ? <OverlayLoader/>: null}
                <StatusBar backgroundColor={WHITE} translucent={false} barStyle={'dark-content'} />
                <View style={{padding: 10, paddingTop: 50}}>
                    <SuccessModal message={'You have successfully marked Attendance for Today'}/>
                     <Image
                        source={HIS}
                        style={{width: 150, height: 150, alignSelf: 'center'}}
                        resizeMode={'contain'}
                     />
                     <View style={{marginTop: 10}}>
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
    return {attendanceLoading}
};

export default connect(mapStateToProps, {markAttendance})(Attendance);
