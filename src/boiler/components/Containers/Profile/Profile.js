import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, TouchableOpacity, ImageBackground, Image, View, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { WHITE, BACKGROUND, GREEN } from '../../../style/colors';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';

import { Container, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';
import { ProfileSection } from '../../Presenters/Profile/ProfileSection';
import { LOGOTRANSPARENT, DOCUMENT, NOIMAGE } from '../../../style/images'
import {toggleImageViewModal, profileUpdate} from './../../../redux/actions';
import ImageViewModal from '../Modals/ImageViewModal';
import _ from 'lodash';
import moment from 'moment';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          activeTab: 0
        }
        this.data = {}
    }

    renderDocuments(){
        let {documents} = this.props.user;
        let splitDocuments = _.chunk(documents, 5);
        let data = [];
        
        splitDocuments.map((item1, index1) => {
            
            let subdata = item1.map((item2, index2) => {
                return(
                <TouchableOpacity
                    key={Math.random().toString(36)}
                    style={{marginLeft: 15}}
                    onPress={() => {
                        this.props.toggleImageViewModal(); 
                        this.props.profileUpdate({prop: 'activeImage', value: {uri: item2.document}})}
                    }
                >
                    <Image
                        source={{uri: item2.document}}
                        style={{width: 130, height: 230}}
                        resizeMode={'contain'}
                        
                    />
                </TouchableOpacity>);
            });
        
            data.push(
            <View key={index1} style={{flexDirection: 'row', justifyContent: item1.length == 5 ? 'space-between' : 'flex-start'}}>
                {subdata}
            </View>
            )
        });
          
        return data;
    }

    prepareQualifications(){
        const {user} = this.props;
        let value = "";
        user.qualifications.map((item, index) => {
            value += `${index + 1}. ${item.qualification}\n`
        });
        return value.trim('\n');
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
                
                <Text style={[styles.textStyle,{color: this.state.activeTab == 2 ? GREEN : '#333333'}]}>Service Data</Text>
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
        const {user} = this.props;
        return (
            
            <Container contentContainerStyle={{flexGrow: 1}}  style={{backgroundColor: BACKGROUND}}>
                <StatusBar translucent={false} backgroundColor={WHITE} barStyle="dark-content"/>
               
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
                            {user.passports ?
                                <Image
                                    source={{uri: user.passports.passport}}
                                    style={{width: 100, height: 100, alignSelf: 'center', marginBottom: 20}}
                                    resizeMode={'contain'}
                                    
                                />
                                : <Image
                                    source={NOIMAGE}
                                    style={{width: 100, height: 100, alignSelf: 'center', marginBottom: 20}}
                                    resizeMode={'contain'}
                                    
                                />}
                            
                                <ProfileSection
                                    label={'BIPPIIS Number:'}
                                    data={user.civil_servants.bippiis_number}
                                />

                                <ProfileSection
                                    label={'Surname:'}
                                    data={user.civil_servants.surname}
                                />
                                <ProfileSection
                                    label={'First Name:'}
                                    data={user.civil_servants.first_name}
                                />
                                <ProfileSection
                                    label={'Other Name(s):'}
                                    data={user.civil_servants.other_names}
                                />
                                <ProfileSection
                                    label={'Date Of Birth:'}
                                    data={moment(user.civil_servants.dob, 'DD/MM/YYYY').format('Do MMMM, YYYY')}
                                />
                                <ProfileSection
                                    label={'Place Of Birth:'}
                                    data={user.civil_servants.pob}
                                />
                                <ProfileSection
                                    label={'Gender:'}
                                    data={user.civil_servants.gender}
                                />
                                <ProfileSection
                                    label={'Marital Status:'}
                                    data={user.civil_servants.marital_status}
                                />
                                <ProfileSection
                                    label={'Blood Group:'}
                                    data={user.civil_servants.blood_group}
                                />
                                <ProfileSection
                                    label={'Nationality:'}
                                    data={user.civil_servants.nationality}
                                />
                                <ProfileSection
                                    label={'State Of Origin:'}
                                    data={user.civil_servants.state_origin}
                                />
                                <ProfileSection
                                    label={'Home Town:'}
                                    data={user.civil_servants.home_town}
                                />
                                <ProfileSection
                                    label={'Religion:'}
                                    data={user.civil_servants.religion}
                                />
                                <ProfileSection
                                    label={'Email Address:'}
                                    data={user.civil_servants.email}
                                />
                                <ProfileSection
                                    label={'Phone Number:'}
                                    data={user.civil_servants.phone}
                                />
                                <ProfileSection
                                    label={'Residential Address:'}
                                    data={user.civil_servants.residential_address}
                                />

                                <ProfileSection
                                    label={'Permanent Home Address:'}
                                    data={user.civil_servants.permanent_address}
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
                                <ProfileSection
                                    label={'Highest Qualification:'}
                                    data={user.civil_servants.highest_qualification}
                                />
                                <ProfileSection
                                    label={'Other Qualifications:'}
                                    data={this.prepareQualifications()}
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
                                {
                                    user.civil_servants.constituency == 'SCS' && user.civil_servants.arm == 'Executive' ?
                                    <ProfileSection
                                        label={'Ministry, Department Or Agency (MDA):'}
                                        data={user.civil_servants.ministry}
                                    />
                                : null
                                }
                                {
                                    user.civil_servants.constituency == 'LGCS' ?
                                    <ProfileSection
                                        label={'Local Government Posted To:'}
                                        data={user.civil_servants.lga_posted_to}
                                    />: null
                                }
                                
                                <ProfileSection
                                    label={'Work Station:'}
                                    data={user.civil_servants.work_station}
                                />
                                {/* <ProfileSection
                                    label={'Employment Status:'}
                                    data={'Benue State Staff'}
                                /> */}
                                <ProfileSection
                                    label={'Personnel Sub-head Number:'}
                                    data={user.civil_servants.subhead_number}
                                />
                                <ProfileSection
                                    label={'Date Of First Appointment:'}
                                    data={moment(user.civil_servants.first_appointment_date, 'DD/MM/YYYY').format('Do MMMM, YYYY')}
                                />
                                <ProfileSection
                                    label={'Job Title/Responsibility:'}
                                    data={user.civil_servants.job_title}
                                />
                                <ProfileSection
                                    label={'Date Of Last Promotion:'}
                                    data={moment(user.civil_servants.last_promotion_date, 'DD/MM/YYYY').format('Do MMMM, YYYY')}
                                />
                                <ProfileSection
                                    label={'Grade Level/Step:'}
                                    data={`Grade ${user.civil_servants.grade.grade_level} / Step ${user.civil_servants.grade.step}`}
                                />
                                <ProfileSection
                                    label={'Rank:'}
                                    data={user.civil_servants.rank}
                                />
                                </ImageBackground>
                            </ScrollView>
                        </Tab>
                        <Tab
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            heading={this.paymentHeading()}>
                            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} style={{backgroundColor: BACKGROUND, padding: 15,}}>
                                
                                <ImageBackground
                                    source={LOGOTRANSPARENT}
                                    style={{width: null, flex: 1}}
                                    resizeMode={'contain'}
                                >
                                <ProfileSection
                                    label={'Bank:'}
                                    data={user.civil_servants.bank}
                                />
                                <ProfileSection
                                    label={'Account Number:'}
                                    data={user.civil_servants.account_number}
                                />
                                <ProfileSection
                                    label={'Bank Verification Number (BVN):'}
                                    data={user.civil_servants.bvn}
                                />
                                
                                </ImageBackground>
                            </ScrollView>
                        </Tab>

                        <Tab
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            heading={this.nextOfKinHeading()}>
                            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} style={{backgroundColor: BACKGROUND, padding: 15,}}>
                                <ImageBackground
                                    source={LOGOTRANSPARENT}
                                    style={{width: null, flex: 1}}
                                    resizeMode={'contain'}
                                >
                                <ProfileSection
                                    label={`Next Of Kin's Surname: `}
                                    data={user.civil_servants.nok_surname}
                                />
                                <ProfileSection
                                    label={`Next Of Kin's First Name: `}
                                    data={user.civil_servants.nok_firstname}
                                />
                                <ProfileSection
                                    label={`Next Of Kin's Midde Name: `}
                                    data={user.civil_servants.nok_middlename}
                                />
                                <ProfileSection
                                    label={`Relationship With Next Of Kin: `}
                                    data={user.civil_servants.nok_rel}
                                />
                                <ProfileSection
                                    label={`Next Of Kin's Phone Number: `}
                                    data={user.civil_servants.nok_phone}
                                />
                                <ProfileSection
                                    label={`Next Of Kin's Contact Address: `}
                                    data={user.civil_servants.nok_address}
                                />
                                
                                </ImageBackground>
                            </ScrollView>
                        </Tab>

                        <Tab
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            heading={this.uploadedDocumentHeading()}>
                            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} style={{backgroundColor: BACKGROUND, padding: 15,}}>
                                <ImageViewModal/>
                                <ImageBackground
                                    source={LOGOTRANSPARENT}
                                    style={{width: null, flex: 1}}
                                    resizeMode={'contain'}
                                >
                                    {this.renderDocuments()}
                                
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
            
    }
}

const mapStateToProps = (state) => {
    const {user} = state.boilerService.auth;
    return {user}
};

export default connect(mapStateToProps, {toggleImageViewModal, profileUpdate})(Profile);
