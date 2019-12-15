import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, TouchableOpacity, FlatList, ImageBackground, Image, View, StatusBar, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE, RED } from '../../../style/colors';
import { Menu as Menup, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker, Icon, Item, DatePicker } from 'native-base';
import { LOGO, ICONBIOMETRICS, ICONFACECAPTURE, ICONPROFILE, ICONPROFILEUPDATE, ICONFINANCIALREPORT, TRANSAPARENTBACKGROUND, GOVERNOR, ICONHEALTH, ICONATTENDANCE, ICONIDCARD, ICONVERIFICATION, LOGOTRANSPARENT } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
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

class SingleQuery extends Component {

    constructor(props){
        super(props);

        this.state = {
            staff_reply: ''
        }
    }

    pickPassportImage(){
        ImagePicker.openPicker({
            width: 500,
            height: 700,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            let base64 = `data:${image.mime};base64,${image.data}`;
            this.setState({staff_reply: base64, mime: image.mime.split('/')[1]});
            console.log(image);
        }).catch(err => {
            
        });
    }

    pickPassportCamera(){
        ImagePicker.openCamera({
            width: 500,
            height: 700,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            let base64 = `data:${image.mime};base64,${image.data}`;
            this.setState({staff_reply: base64, mime: image.mime.split('/')[1]});
            console.log(image);
        }).catch(err => {
            
        });
    }

    reply(){
        let data = {
            id: this.props.singleQuery.id,
            staff_reply: this.state.staff_reply
        }
        this.props.replyQuery(data);
    }

    render() {
        const {query_letter, staff_reply} = this.props.singleQuery;
        const {civil_servants} = this.props.user;
        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, padding: 25}} style={{backgroundColor: BACKGROUND}}>
                <StatusBar translucent={false} backgroundColor={WHITE} barStyle="dark-content"/>
                {this.props.queryLoading ? <OverlayLoader/> : null}
                <ImageViewModal/>
                <SuccessModal 
                    print={true} 
                    time={moment().format('ddd Do MMM, YYYY - hh:ss A')} 
                    staffName={civil_servants.surname +' '+ civil_servants.first_name} 
                    operation={'Query Reply'} 
                    bippiis_number={civil_servants.bippiis_number}  
                    message={'You have successfully submitted your reply to this query'} 
                    
                />
                <ImageBackground
                    source={LOGOTRANSPARENT}
                    style={{width: null, flex: 1}}
                    resizeMode={'contain'}
                >
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity
                        style={{alignSelf: 'center'}}
                        onPress={() => {
                            this.props.toggleImageViewModal(); 
                            this.props.profileUpdate({prop: 'activeImage', value: {uri: query_letter}})}
                        }
                    >
                        <Text style={{fontFamily: FONTFAMILYREGULAR, fontSize: 18, paddingBottom: 15}}>Query Letter</Text>
                        <Image
                            source={{uri: query_letter}}
                            style={{width: 100, height: 100}}
                            resizeMode={'contain'}
                            
                        />
                
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{alignSelf: 'center'}}
                        onPress={() => {
                            this.props.toggleImageViewModal(); 
                            this.props.profileUpdate({prop: 'activeImage', value: {uri: staff_reply}})}
                        }
                    >
                        <Text style={{fontFamily: FONTFAMILYREGULAR, fontSize: 18, paddingBottom: 15}}>Staff Reply</Text>
                        <Image
                            source={{uri: staff_reply}}
                            style={{width: 100, height: 100}}
                            resizeMode={'contain'}
                            
                        />
                
                    </TouchableOpacity>
                </View>
                {this.props.singleQuery.staff_reply == null ?
                <View>
                   <View>
                        <Text style={{fontFamily: FONTFAMILYREGULAR, fontSize: 18}}>Reply Query</Text>
                        <Menup>
                            <MenuTrigger style={styles.buttonStyle}>
                                <MaterialCommunityIcon style={{alignSelf: 'center'}} color={'#0AAF2C'} name="cloud-upload" size={48} />
                                <Text style={{textAlign: 'center', color: '#0AAF2C', paddingBottom: 5, fontSize: 18, marginTop: 5}}>Upload Document</Text>
                            </MenuTrigger>
                            <Text style={{color: RED, textAlign: 'right'}}>{this.props.errors.hasOwnProperty('staff_reply') ? this.props.errors.staff_reply[0] : ''}</Text>
                            
                            <MenuOptions optionsContainerStyle={{ paddingTop: 8, paddingBottom: 8 }}>
                                <MenuOption onSelect={() => this.pickPassportImage()}>
                                    <Text style={styles.menuOptionStyle}>Choose from Gallery</Text>
                                </MenuOption>
                                <MenuOption onSelect={() => this.pickPassportCamera()} >
                                    <Text style={styles.menuOptionStyle}>Take a Picture</Text>
                                </MenuOption>
                                
                            </MenuOptions>
                        </Menup>
                    </View>

                    {
                        
                        this.state.staff_reply.length > 5 ? 
                        <UploadedFile filename={`document.${this.state.mime}`} mime={this.state.mime} />
                        : null
                    }
                    
                    
                    <RoundedButton
                        name={'Submit'}
                        onPress={() => this.reply()}
                        buttonStyle={{marginTop: 20}}
                        textStyle={{textAlign: 'center', color: WHITE, fontSize: 20}}
                    />
                </View>
                : null}
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
    const {queries, singleQuery} = state.boilerService.profile;
    const {queryLoading} = state.boilerService.loader;
    const {errors} = state.boilerService.error;
    const {user} = state.boilerService.auth;
    return {queries, singleQuery, queryLoading, user, errors}
};

export default connect(mapStateToProps, {getQueries,replyQuery, toggleImageViewModal, profileUpdate})(SingleQuery);
