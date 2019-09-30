import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, TouchableOpacity, ImageBackground, Image, View, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { WHITE, BACKGROUND, GREEN } from '../../../style/colors';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';

import { Container, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';
import { ProfileSection } from '../../Presenters/Profile/ProfileSection';
import { LOGOTRANSPARENT, DOCUMENT } from '../../../style/images'
import {toggleImageViewModal, profileUpdate} from './../../../redux/actions';
import ImageViewModal from '../Modals/ImageViewModal';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          activeTab: 0
        }
        this.data = {}
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
                            
                                <ProfileSection
                                    label={'BIPPIIS Number:'}
                                    data={'BNS-4893715'}
                                />

                                <ProfileSection
                                    label={'Surname:'}
                                    data={'Obeagu'}
                                />
                                <ProfileSection
                                    label={'First Name:'}
                                    data={'Divine'}
                                />
                                <ProfileSection
                                    label={'Other Name(s):'}
                                    data={'Divine'}
                                />
                                <ProfileSection
                                    label={'Date Of Birth:'}
                                    data={'27/07/1989'}
                                />
                                <ProfileSection
                                    label={'Place Of Birth:'}
                                    data={'Enugu'}
                                />
                                <ProfileSection
                                    label={'Gender:'}
                                    data={'Male'}
                                />
                                <ProfileSection
                                    label={'Marital Status:'}
                                    data={'Single'}
                                />
                                <ProfileSection
                                    label={'Blood Group:'}
                                    data={'A+'}
                                />
                                <ProfileSection
                                    label={'Nationality:'}
                                    data={'Nigeria'}
                                />
                                <ProfileSection
                                    label={'State Of Origin:'}
                                    data={'Enugu'}
                                />
                                <ProfileSection
                                    label={'Home Town:'}
                                    data={'Akpugo'}
                                />
                                <ProfileSection
                                    label={'Religion:'}
                                    data={'Christianity'}
                                />
                                <ProfileSection
                                    label={'Email Address:'}
                                    data={'divike@gmail.com'}
                                />
                                <ProfileSection
                                    label={'Phone Number:'}
                                    data={'07032125552'}
                                />
                                <ProfileSection
                                    label={'Residential Address:'}
                                    data={'Lagos Nigeria'}
                                />

                                <ProfileSection
                                    label={'Permanent Home Address:'}
                                    data={'Lagos Nigeria'}
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
                                    data={'B.Sc Statistics/Computer Science'}
                                />
                                <ProfileSection
                                    label={'Other Qualifications:'}
                                    data={'1. WAEC\n2. FSLC'}
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
                                <ProfileSection
                                    label={'Ministry, Department Or Agency (MDA):'}
                                    data={'Benue State Local Government Pensions Board'}
                                />
                                <ProfileSection
                                    label={'Local Government Posted To:'}
                                    data={'Ado'}
                                />
                                <ProfileSection
                                    label={'Work Station:'}
                                    data={'Benue State Pensions Board'}
                                />
                                <ProfileSection
                                    label={'Employment Status:'}
                                    data={'Benue State Staff'}
                                />
                                <ProfileSection
                                    label={'Personnel Sub-head Number:'}
                                    data={'123456'}
                                />
                                <ProfileSection
                                    label={'Date Of First Appointment:'}
                                    data={'03/09/2019'}
                                />
                                <ProfileSection
                                    label={'Job Title/Responsibility:'}
                                    data={'Head Of Training'}
                                />
                                <ProfileSection
                                    label={'Date Of Last Promotion:'}
                                    data={'23/09/2019'}
                                />
                                <ProfileSection
                                    label={'Grade Level/Step:'}
                                    data={'Grade 06 / Step 03'}
                                />
                                <ProfileSection
                                    label={'Rank:'}
                                    data={'Chief Admin'}
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
                                    data={'Access Bank'}
                                />
                                <ProfileSection
                                    label={'Account Number:'}
                                    data={'1019850999'}
                                />
                                <ProfileSection
                                    label={'Bank Verification Number (BVN):'}
                                    data={'1234567890'}
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
                                    data={'Okebugwu'}
                                />
                                <ProfileSection
                                    label={`Next Of Kin's First Name: `}
                                    data={'Joy'}
                                />
                                <ProfileSection
                                    label={`Next Of Kin's Midde Name: `}
                                    data={'Onyedikachi'}
                                />
                                <ProfileSection
                                    label={`Relationship With Next Of Kin: `}
                                    data={'Wife'}
                                />
                                <ProfileSection
                                    label={`Next Of Kin's Phone Number: `}
                                    data={'NIL'}
                                />
                                <ProfileSection
                                    label={`Next Of Kin's Contact Address: `}
                                    data={'Lagos, Nigeria'}
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
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <TouchableOpacity
                                            onPress={() => {this.props.toggleImageViewModal(); this.props.profileUpdate({prop: 'activeImage', value: DOCUMENT})}}
                                        >
                                            <Image
                                                source={DOCUMENT}
                                                style={{width: 200, height: 200}}
                                                resizeMode={'contain'}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {this.props.toggleImageViewModal(); this.props.profileUpdate({prop: 'activeImage', value: DOCUMENT})}}
                                        >
                                            <Image
                                                source={DOCUMENT}
                                                style={{width: 200, height: 200}}
                                                resizeMode={'contain'}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {this.props.toggleImageViewModal(); this.props.profileUpdate({prop: 'activeImage', value: DOCUMENT})}}
                                        >
                                            <Image
                                                source={DOCUMENT}
                                                style={{width: 200, height: 200}}
                                                resizeMode={'contain'}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {this.props.toggleImageViewModal(); this.props.profileUpdate({prop: 'activeImage', value: DOCUMENT})}}
                                        >
                                            <Image
                                                source={DOCUMENT}
                                                style={{width: 200, height: 200}}
                                                resizeMode={'contain'}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {this.props.toggleImageViewModal(); this.props.profileUpdate({prop: 'activeImage', value: DOCUMENT})}}
                                        >
                                            <Image
                                                source={DOCUMENT}
                                                style={{width: 200, height: 200}}
                                                resizeMode={'contain'}
                                            />
                                        </TouchableOpacity>
                                       
                                    </View>
                                
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
    return {}
};

export default connect(mapStateToProps, {toggleImageViewModal, profileUpdate})(Profile);
