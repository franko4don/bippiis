import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, TouchableOpacity, FlatList, ImageBackground, Image, View, StatusBar, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE, RED, BLACK, GRAY } from '../../../style/colors';
import { Menu as Menup, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker, Icon, Item, DatePicker } from 'native-base';
import { LOGO, ICONBIOMETRICS, ICONFACECAPTURE, ICONPROFILE, ICONPROFILEUPDATE, ICONFINANCIALREPORT, TRANSAPARENTBACKGROUND, GOVERNOR, ICONHEALTH, ICONATTENDANCE, ICONIDCARD, ICONVERIFICATION, LOGOTRANSPARENT } from '../../../style/images';
import { Text, RoundedInput, RoundedButton, Card } from '../../Reusables';
import {getQueries, toggleImageViewModal, replyQuery, profileUpdate} from './../../../redux/actions';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR, FONTFAMILYSEMIBOLD } from '../../../style/fonts';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import { HomeSection } from '../../Presenters/Home/HomeSection';
import { calculateOpacity } from '../../../../Helper';
import { Actions } from 'react-native-router-flux';
import { QuerySection } from '../../Presenters/Query/QuerySection';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import { UploadedFile } from '../../Reusables/Other/UploadedFile';
import ImageViewModal from '../Modals/ImageViewModal';
import SuccessModal from '../Modals/SuccessModal';

class SingleTransfer extends Component {

    constructor(props){
        super(props);

        this.state = {
            staff_reply: ''
        }
    }

    render() {
        const {
            old_arm, old_ministry, old_work_station, old_lga, old_job_title, 
            new_arm, new_ministry, new_work_station, new_lga, new_job_title,
            transfer_letter, date_effected
        } = this.props.singleTransfer;

        const {civil_servants} = this.props.user;
        
        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, padding: 5}} style={{backgroundColor: BACKGROUND}}>
                <StatusBar translucent={false} backgroundColor={WHITE} barStyle="dark-content"/>
                {this.props.transferLoading ? <OverlayLoader/> : null}
                <ImageViewModal/>
                
                <ImageBackground
                    source={LOGOTRANSPARENT}
                    style={{width: null, flex: 1}}
                    resizeMode={'contain'}
                >
                <Card style={{backgroundColor: WHITE, padding: 10, paddingLeft: 10, marginBottom: 10}}>
                    <Text style={{color: GRAY, fontSize: 13}}>Old Arm: <Text style={{color: BLACK, fontSize: 15}}>{old_arm}</Text></Text>
                    <Text style={{color: GRAY, fontSize: 13}}>Old Ministry: <Text style={{color: BLACK, fontSize: 15}}>{old_ministry}</Text></Text>
                    <Text style={{color: GRAY, fontSize: 13}}>Old Work Station: <Text style={{color: BLACK, fontSize: 15}}>{old_work_station}</Text></Text>
                    {
                        civil_servants.constituency == 'LGCS' ?
                        <Text style={{color: GRAY, fontSize: 13}}>Old LGA: <Text style={{color: BLACK, fontSize: 15}}>{old_lga}</Text></Text> : null
                    }
                    <Text style={{color: GRAY, fontSize: 13}}>Old Job Title: <Text style={{color: BLACK, fontSize: 15}}>{old_job_title}</Text></Text>
                    
                </Card>

                <Card style={{backgroundColor: WHITE, padding: 10, paddingLeft: 10,}}>
                    <Text style={{color: GRAY, fontSize: 13}}>New Arm: <Text style={{color: BLACK, fontSize: 15}}>{new_arm}</Text></Text>        
                    <Text style={{color: GRAY, fontSize: 13}}>New Ministry: <Text style={{color: BLACK, fontSize: 15}}>{new_ministry}</Text></Text>
                    <Text style={{color: GRAY, fontSize: 13}}>New Work Station: <Text style={{color: BLACK, fontSize: 15}}>{new_work_station}</Text></Text>
                    {
                        civil_servants.constituency == 'LGCS' ?
                        <Text style={{color: GRAY, fontSize: 13}}>New LGA: <Text style={{color: BLACK, fontSize: 15}}>{new_lga}</Text></Text> : null
                    }
                    <Text style={{color: GRAY, fontSize: 13}}>New Job Title: <Text style={{color: BLACK, fontSize: 15}}>{new_job_title}</Text></Text>
                    <Text style={{color: GRAY, fontSize: 13}}>Date Effected: <Text style={{color: BLACK, fontSize: 15}}>{moment(date_effected, 'YYYY/MM/DD').format('Do MMMM, YYYY')}</Text></Text>
                </Card>
                
                <View style={{padding: 15}}>
                    <Text style={{color: GRAY, fontSize: 13}}>Transfer Letter</Text>
                
                    <TouchableOpacity
                        onPress={() => {
                            this.props.toggleImageViewModal(); 
                            this.props.profileUpdate({prop: 'activeImage', value: {uri: transfer_letter}})}
                        }
                    >
                        
                        <Image
                            source={{uri: transfer_letter}}
                            style={{width: 100, height: 100}}
                            resizeMode={'contain'}
                            
                        />
                
                    </TouchableOpacity>
                </View>
                </ImageBackground>
                 
            </ScrollView>

        );
    }
}

const styles = {
    menuOptionStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        
    },
    buttonStyle: {
        borderWidth: 1,
        borderRadius: 0.3,
        borderColor: '#0AAF2C',
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 15,
        marginBottom: 10
    }
}

const mapStateToProps = (state) => {
    const {transfers, singleTransfer} = state.boilerService.profile;
    const {transferLoading} = state.boilerService.loader;
    const {errors} = state.boilerService.error;
    const {user} = state.boilerService.auth;
    return {transfers, singleTransfer, transferLoading, user, errors}
};

export default connect(mapStateToProps, {toggleImageViewModal, profileUpdate})(SingleTransfer);
