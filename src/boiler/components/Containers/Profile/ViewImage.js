import React, { Component } from 'react';
import { Dimensions, Modal, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { calculateOpacity } from '../../../../Helper';
import { GREEN, WHITE, RED, BACKGROUND } from '../../../style/colors';
import { Card, Text, RoundedButton } from '../../Reusables';
import { Actions } from 'react-native-router-flux';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import {uploadPassport} from './../../../redux/actions';
import SuccessModal from '../Modals/SuccessModal';
import moment from 'moment';

class ViewImage extends Component {

    uploadPassport(){
        this.props.uploadPassport({passport: this.props.image});
    }


    render() {
        const {width} = Dimensions.get('screen');
        const {civil_servants} = this.props.user;
        return (
            
                   <View style={{flex: 1, backgroundColor: BACKGROUND, justifyContent: 'center'}}>
                   {this.props.passportLoading ? <OverlayLoader/> : null}
                   <SuccessModal print={true} time={moment().format('ddd Do MMM, YYYY - hh:ss A')} staffName={civil_servants.surname +' '+ civil_servants.first_name} operation={'Face Capture'} bippiis_number={civil_servants.bippiis_number}  message={'You have successfully completed face capture'} />
                    <Card style={styles.cardStyle}>
                       
                        <View>
                            <Image
                                source={{uri: this.props.image}}
                                style={{width: 300, height: 300, alignSelf: 'center'}}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 35, justifyContent: 'center'}}>
                            <RoundedButton
                                name={'Retake'}
                                onPress={() => {Actions.camera();}}
                                textStyle={{color: WHITE, textAlign: 'center', fontSize: 13,}}
                                buttonStyle={{backgroundColor: RED, paddingLeft: 25, paddingRight: 25, paddingTop: 8, paddingBottom: 8, marginLeft: 5, marginRight: 15}}
                            />

                            <RoundedButton
                                onPress={() => this.uploadPassport()}
                                name={'Proceed'}
                                buttonStyle={{paddingTop: 8, paddingBottom: 8}}
                                textStyle={{color: WHITE, fontSize: 13, textAlign: 'center'}}
                            />
                        </View>
                    </Card>
                    </View>
             

        );
    }
}

const styles = {
    cardStyle: {
        backgroundColor: BACKGROUND,
        marginLeft: 20,
        marginRight: 20,
        paddingRight: 15,
        paddingTop: 40,
        elevation: 0,
        paddingBottom: 30,
      }
}

const mapStateToProps = (state) => {
    const {passportLoading} = state.boilerService.loader;
    const {user} = state.boilerService.auth;
    const {image} = state.boilerService.capture;
    return {passportLoading, image, user}
};

export default connect(mapStateToProps, {uploadPassport})(ViewImage);
