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
import {toggleImageViewModal, profileUpdate, toggleSuccessModal, updateProfile, updateDocument, updateQualification} from './../../../redux/actions';
import ImageViewModal from '../Modals/ImageViewModal';
import { SquareInput } from '../../Reusables/Input/SquareInput';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import SuccessModal from '../Modals/SuccessModal';
import config from './../../../redux/config';
import { UploadedFile } from '../../Reusables/Other/UploadedFile';
import moment from 'moment';

class UpdateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          activeTab: 0,
          email: '',
          phone: '',
          nok_surname: '',
          nok_firstname: '',
          nok_rel: '',
          nok_phone: '',
          nok_middlename: '',
          nok_address: '',
          qualification: '',
          year_awarded: '',
          certificate: '',
          author: config.author,
          highest_qualification: '',
          residential_address: '',
          doc_title: '',
          document: '',
          mime: '',
          another: null,
          operation: ''
        }
        this.data = {}
    }

    clearFields(){
        this.setState({
            document: '',
            qualification: '',
            year_awarded: '',
            doc_title: ''
        });
    }

    updateProfile(){
        this.setState({message: 'You have successfully updated your profile', another: null, operation: 'Profile Update'});
        this.props.updateProfile(this.state);
    }

    updateQualification(){
        this.setState({message: 'You have successfully updated your qualifications', another: true, operation: 'Qualification Update'});
        this.props.updateQualification(this.state);
    }

    pickPassportImage(){
        ImagePicker.openPicker({
            width: 500,
            height: 700,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            let base64 = `data:${image.mime};base64,${image.data}`;
            this.setState({document: base64, mime: image.mime.split('/')[1]});
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
            this.setState({document: base64, mime: image.mime.split('/')[1]});
            console.log(image);
        }).catch(err => {
            
        });
    }

    updateDocument(){
        this.setState({message: 'You have successfully uploaded a document', another: true, operation: 'Document Upload'});
        this.props.updateDocument(this.state);
    }

    componentWillMount(){
        const {civil_servants} = this.props.user;
        const {email, nok_address, nok_rel, nok_firstname, residential_address, highest_qualification, nok_middlename, nok_phone, nok_surname, phone} = civil_servants;

        this.setState({
            email, nok_address, nok_firstname, highest_qualification, residential_address, nok_rel, nok_middlename, nok_phone, nok_rel,nok_surname, phone
        });
    }

    profileHeading = () => {
        return (
            <TabHeading style={[styles.tabHeadingStyle, this.state.activeTab == 0 ? styles.activeTabHeadingStyle : {}]}>
                
                <Text style={[styles.textStyle,{color: this.state.activeTab == 0 ? GREEN : '#333333'}]}>Profile</Text>
            </TabHeading>
        );
    }

    academicHeading = () => {
        return (
            <TabHeading style={[styles.tabHeadingStyle, this.state.activeTab == 1 ? styles.activeTabHeadingStyle : {}]}>
                <Text style={[styles.textStyle,{color: this.state.activeTab == 1 ? GREEN : '#333333'}]}>   Academic Information </Text>
            </TabHeading>
        );
    }

    serviceHeading = () => {
        return (
            <TabHeading style={[styles.tabHeadingStyle, this.state.activeTab == 2 ? styles.activeTabHeadingStyle : {}]}>
                
                <Text style={[styles.textStyle,{color: this.state.activeTab == 2 ? GREEN : '#333333'}]}>Upload Documents</Text>
            </TabHeading>
        );
    }

    paymentHeading = () => {
        return (
            <TabHeading style={[styles.tabHeadingStyle, this.state.activeTab == 3 ? styles.activeTabHeadingStyle : {}]}>
                <Text style={[styles.textStyle,{color: this.state.activeTab ==3 ? GREEN : '#333333'}]}>   Payment Details </Text>
            </TabHeading>
        );
    }

    nextOfKinHeading = () => {
        return (
            <TabHeading style={[styles.tabHeadingStyle, this.state.activeTab == 4 ? styles.activeTabHeadingStyle : {}]}>
                <Text style={[styles.textStyle,{color: this.state.activeTab ==4 ? GREEN : '#333333'}]}>   Next of Kin Details </Text>
            </TabHeading>
        );
    }

    uploadedDocumentHeading = () => {
        return (
            <TabHeading style={[styles.tabHeadingStyle, this.state.activeTab == 5 ? styles.activeTabHeadingStyle : {}]}>
                <Text style={[styles.textStyle,{color: this.state.activeTab == 5 ? GREEN : '#333333'}]}>  Uploaded Documents </Text>
            </TabHeading>
        );
    }


    render() {
        const {civil_servants} = this.props.user;
        return (
            
            <Container contentContainerStyle={{flexGrow: 1}}  style={{backgroundColor: BACKGROUND}}>
                <StatusBar translucent={false} backgroundColor={WHITE} barStyle="dark-content"/>
               {this.props.profileLoading ? <OverlayLoader/> : null}
               <SuccessModal 
                    print={true} 
                    time={moment().format('ddd Do MMM, YYYY - hh:ss A')} 
                    staffName={civil_servants.surname +' '+ civil_servants.first_name} 
                    operation={this.state.operation} 
                    bippiis_number={civil_servants.bippiis_number}  
                    onPress={() => {
                        this.props.toggleSuccessModal(false);
                        this.clearFields()
                    }}
                    message={this.state.message} 
                    another={this.state.another} 
                    anotherText={'Add'}
                />
               {/* <SuccessModal 
                onPress={() => {
                    this.props.toggleSuccessModal(false);
                    this.clearFields()
                }}
                message={this.state.message} 
                another={this.state.another} 
                anotherText={'Add'}
                /> */}
                <Tabs  
                    onChangeTab={({ i }) => {this.setState({activeTab: i}); console.log(i, 'activeTab')}}
                    style={styles.tabStyle}
                    tabBarUnderlineStyle={{backgroundColor: '#04751B', height: 2.4}}
                    tabBarBackgroundColor={WHITE}
                    renderTabBar={()=> <ScrollableTab style={{ elevation: 0, borderBottomWidth: 0}} />}
                    tabContainerStyle={styles.tabContainerStyle}
                >
                    
                        <Tab
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            heading={this.profileHeading()}>
                            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} style={{backgroundColor: BACKGROUND, padding: 15,}}>
                            <ImageBackground
                                source={LOGOTRANSPARENT}
                                style={{width: null, flex: 1}}
                                resizeMode={'contain'}
                            >
                            <SquareInput
                                label={'Email'}
                                value={this.state.email}
                                onChangeText={(value) => this.setState({'email': value})}
                                error={this.props.errors.hasOwnProperty('email') ? this.props.errors.email[0] : ''}
                            />
                            <SquareInput
                                label={'Phone Number'}
                                value={this.state.phone}
                                onChangeText={(value) => this.setState({'phone': value})}
                                error={this.props.errors.hasOwnProperty('phone') ? this.props.errors.phone[0] : ''}
                            />
                            <SquareInput
                                label={'Residential Address'}
                                value={this.state.residential_address}
                                onChangeText={(value) => this.setState({'residential_address': value})}
                                error={this.props.errors.hasOwnProperty('residential_address') ? this.props.errors.residential_address[0] : ''}
                            />
                            <SquareInput
                                label={'Next of Kin Surname'}
                                value={this.state.nok_surname}
                                onChangeText={(value) => this.setState({'nok_surname': value})}
                                error={this.props.errors.hasOwnProperty('nok_surname') ? this.props.errors.nok_surname[0] : ''}
                            />
                            <SquareInput
                                label={'Next of Kin Firstname'}
                                value={this.state.nok_firstname}
                                onChangeText={(value) => this.setState({'nok_firstname': value})}
                                error={this.props.errors.hasOwnProperty('nok_firstname') ? this.props.errors.nok_firstname[0] : ''}
                            />
                            <SquareInput
                                label={'Next of kin middlename'}
                                value={this.state.nok_middlename}
                                onChangeText={(value) => this.setState({'nok_middlename': value})}
                                error={this.props.errors.hasOwnProperty('nok_middlename') ? this.props.errors.nok_middlename[0] : ''}
                            />
                            <SquareInput
                                label={'Next of kin phone number'}
                                value={this.state.nok_phone}
                                onChangeText={(value) => this.setState({'nok_phone': value})}
                                error={this.props.errors.hasOwnProperty('nok_phone') ? this.props.errors.nok_phone[0] : ''}
                            />
                            <SquareInput
                                label={'Relation with next of kin'}
                                value={this.state.nok_rel}
                                onChangeText={(value) => this.setState({'nok_rel': value})}
                                error={this.props.errors.hasOwnProperty('nok_rel') ? this.props.errors.nok_rel[0] : ''}
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
                            
                           
                        </Tab>

                        <Tab
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            heading={this.academicHeading()}>
                            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} style={{backgroundColor: BACKGROUND, padding: 15,}}>
                                <ImageBackground
                                    source={LOGOTRANSPARENT}
                                    style={{width: null, flex: 1}}
                                    resizeMode={'contain'}
                                >
                                <SquareInput
                                    label={'Highest Academic Qualification'}
                                    value={this.state.highest_qualification}
                                    onChangeText={(value) => this.setState({'highest_qualification': value})}
                                    error={this.props.errors.hasOwnProperty('highest_qualification') ? this.props.errors.highest_qualification[0] : ''}
                                />

                                <SquareInput
                                    label={'Qualification'}
                                    value={this.state.qualification}
                                    onChangeText={(value) => this.setState({'qualification': value})}
                                    error={this.props.errors.hasOwnProperty('qualification') ? this.props.errors.qualification[0] : ''}
                                />
                                <SquareInput
                                    label={'Year Awarded'}
                                    value={this.state.year_awarded}
                                    onChangeText={(value) => this.setState({'year_awarded': value})}
                                    error={this.props.errors.hasOwnProperty('year_awarded') ? this.props.errors.year_awarded[0] : ''}
                                />

                                <RoundedButton
                                    name={'Add Qualification'}
                                    onPress={() => this.updateQualification()}
                                    buttonStyle={{marginTop: 25}}
                                    textStyle={{textAlign: 'center', color: WHITE, fontSize: 20}}
                                />
                              
                                </ImageBackground>
                            </ScrollView>
                        </Tab>
                        <Tab
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            heading={this.serviceHeading()}>
                            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} style={{backgroundColor: BACKGROUND, padding: 15,}}>
                                <ImageBackground
                                    source={LOGOTRANSPARENT}
                                    style={{width: null, flex: 1}}
                                    resizeMode={'contain'}
                                >
                                    <Text style={{color: '#707070', paddingBottom: 10}}>Document Title</Text>
                                    <Item style={{borderColor: '#DCDCDC', borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, height: 40, marginBottom: 20, elevation: 0, backgroundColor: WHITE}}>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        iosIcon={<Icon style={{flex: 1}} name="arrow-down" />}
                                        style={{ flex: 1, paddingLeft: 3, paddingRight: 5 }}
                                        selectedValue={this.state.doc_title ? this.state.doc_title : this.props.user.docs[0].document}
                                        onValueChange={(value) => this.setState({doc_title: value})}
                                        >
                                        {this.props.user.docs.map((item, index) => {

                                        return( <Picker.Item key={index} textStyle={{color: 'black'}} label={item.document} value={item.document} />)
                                        })}
                                        
                                    </Picker>
                                    </Item>
                                    <Menup>
                                        <MenuTrigger style={styles.buttonStyle}>
                                            <MaterialCommunityIcon style={{alignSelf: 'center'}} color={'#0AAF2C'} name="cloud-upload" size={48} />
                                            <Text style={{textAlign: 'center', color: '#0AAF2C', paddingBottom: 5, fontSize: 18, marginTop: 5}}>Upload Document</Text>
                                        </MenuTrigger>
                                        <Text style={{color: RED, textAlign: 'right'}}>{this.props.errors.hasOwnProperty('document') ? this.props.errors.document[0] : ''}</Text>
                                        
                                        <MenuOptions optionsContainerStyle={{ paddingTop: 8, paddingBottom: 8 }}>
                                            <MenuOption onSelect={() => this.pickPassportImage()}>
                                                <Text style={styles.menuOptionStyle}>Choose from Gallery</Text>
                                            </MenuOption>
                                            <MenuOption onSelect={() => this.pickPassportCamera()} >
                                                <Text style={styles.menuOptionStyle}>Take a Picture</Text>
                                            </MenuOption>
                                            
                                        </MenuOptions>
                                    </Menup>

                                    {
                                        this.state.document.length > 5 ? 
                                        <UploadedFile filename={`document.${this.state.mime}`} mime={this.state.mime} />
                                        : null
                                    }
                                    

                                    <RoundedButton
                                        name={'Submit'}
                                        onPress={() => this.updateDocument()}
                                        buttonStyle={{marginTop: 25}}
                                        textStyle={{textAlign: 'center', color: WHITE, fontSize: 20}}
                                    />
                                </ImageBackground>
                            </ScrollView>
                        </Tab>
                        
                </Tabs>

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

export default connect(mapStateToProps, {toggleImageViewModal, toggleSuccessModal, updateDocument, updateQualification, profileUpdate, updateProfile})(UpdateProfile);
