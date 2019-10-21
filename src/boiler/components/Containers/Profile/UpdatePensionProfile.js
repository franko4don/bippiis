import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, TouchableOpacity, ImageBackground, Image, View, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { Picker, Icon, Item, DatePicker } from 'native-base';
import { Menu as Menup, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import { WHITE, BACKGROUND, GREEN, RED } from '../../../style/colors';
import { Text, RoundedInput, RoundedButton, UploadButton } from '../../Reusables';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';
import { ProfileSection } from '../../Presenters/Profile/ProfileSection';
import { LOGOTRANSPARENT, DOCUMENT } from '../../../style/images'
import {toggleImageViewModal, updatePensionProfile, profileUpdate, toggleSuccessModal, updateProfile, updateDocument, updateQualification} from './../../../redux/actions';
import ImageViewModal from '../Modals/ImageViewModal';
import { SquareInput } from '../../Reusables/Input/SquareInput';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import SuccessModal from '../Modals/SuccessModal';
import config from './../../../redux/config';
import { UploadedFile } from '../../Reusables/Other/UploadedFile';
import moment from 'moment';

class UpdatePensionProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          activeTab: 0,
          phone: '',
          nok_name:'',
          nok_address: '',
          nok_relationship: '',
          nok_phone: '',
          author: config.author,
          another: null,
          operation: ''
        }
        this.data = {}
    }

    clearFields(){
     
    }

    updateProfile(){
        this.setState({message: 'You have successfully updated your profile', another: null, operation: 'Profile Update'});
        this.props.updatePensionProfile(this.state);
    }

    componentWillMount(){
        const {lga_pensioners} = this.props.user;
        const {
            phone,
            nok_name,
            nok_address,
            nok_relationship,
            nok_phone,
        } = lga_pensioners;

        this.setState({
            phone,
            nok_name,
            nok_address,
            nok_relationship,
            nok_phone,
        });
    }

    profileHeading = () => {
        return (
            <TabHeading style={[styles.tabHeadingStyle, this.state.activeTab == 0 ? styles.activeTabHeadingStyle : {}]}>
                
                <Text style={[styles.textStyle,{color: this.state.activeTab == 0 ? GREEN : '#333333'}]}>Profile</Text>
            </TabHeading>
        );
    }


    render() {
        const {lga_pensioners} = this.props.user;
        return (
            
            <Container contentContainerStyle={{flexGrow: 1}}  style={{backgroundColor: BACKGROUND}}>
                <StatusBar translucent={false} backgroundColor={WHITE} barStyle="dark-content"/>
               {this.props.profileLoading ? <OverlayLoader/> : null}
               <SuccessModal 
                    print={true} 
                    time={moment().format('ddd Do MMM, YYYY - hh:ss A')} 
                    staffName={lga_pensioners.fullname} 
                    operation={this.state.operation} 
                    bippiis_number={lga_pensioners.bippiis_number}  
                    onPress={() => {
                        this.props.toggleSuccessModal(false);
                        this.clearFields()
                    }}
                    message={this.state.message} 
                    another={this.state.another} 
                    anotherText={'Add'}
                />
   
                            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} style={{backgroundColor: BACKGROUND, padding: 15,}}>
                            <ImageBackground
                                source={LOGOTRANSPARENT}
                                style={{width: null, flex: 1}}
                                resizeMode={'contain'}
                            >
                           
                            <SquareInput
                                label={'Phone Number'}
                                value={this.state.phone}
                                onChangeText={(value) => this.setState({'phone': value})}
                                error={this.props.errors.hasOwnProperty('phone') ? this.props.errors.phone[0] : ''}
                            />
                            
                            <SquareInput
                                label={'Next of Name'}
                                value={this.state.nok_name}
                                onChangeText={(value) => this.setState({'nok_name': value})}
                                error={this.props.errors.hasOwnProperty('nok_name') ? this.props.errors.nok_name[0] : ''}
                            />
                           
                            <SquareInput
                                label={'Next of kin phone number'}
                                value={this.state.nok_phone}
                                onChangeText={(value) => this.setState({'nok_phone': value})}
                                error={this.props.errors.hasOwnProperty('nok_phone') ? this.props.errors.nok_phone[0] : ''}
                            />
                            <SquareInput
                                label={'Relationship with next of kin'}
                                value={this.state.nok_relationship}
                                onChangeText={(value) => this.setState({'nok_relationship': value})}
                                error={this.props.errors.hasOwnProperty('nok_relationship') ? this.props.errors.nok_relationship[0] : ''}
                            />
                            <SquareInput
                                label={'Next of Kin Address'}
                                value={this.state.nok_address}
                                onChangeText={(value) => this.setState({'nok_address': value})}
                                error={this.props.errors.hasOwnProperty('nok_address') ? this.props.errors.nok_address[0] : ''}
                            />
                            <RoundedButton
                                name={'Submit'}
                                onPress={() => this.updateProfile()}
                                buttonStyle={{marginTop: 25}}
                                textStyle={{textAlign: 'center', color: WHITE, fontSize: 20}}
                                
                            />
                            
                            </ImageBackground>
                            </ScrollView>

            </Container>
        )


    }
}

const styles = {
    tabStyle: {

    },
    tabContainerStyle:{
        flex: 0,
        justifyContent: 'flex-start',
        backgroundColor: WHITE,
        elevation: 0,
        paddingBottom: 0,
        marginBottom: 0,
      
    },

    tabStyle: {
        backgroundColor: WHITE,
        paddingTop: 0
    },

    tabHeadingStyle: {
        backgroundColor: WHITE,
        paddingTop: 0,
        marginTop: 20
    },
    textStyle: {
        fontSize: 14, 
            
    },
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
        marginBottom: 15
    }
}

const mapStateToProps = (state) => {
    const {user} = state.boilerService.auth;
    const {profileLoading} = state.boilerService.loader;
    const {errors} = state.boilerService.error;
    return {user, profileLoading, errors}
};

export default connect(mapStateToProps, {toggleImageViewModal, updatePensionProfile, toggleSuccessModal, updateDocument, updateQualification, profileUpdate, updateProfile})(UpdatePensionProfile);
