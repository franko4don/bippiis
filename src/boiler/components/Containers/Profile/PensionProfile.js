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

class PensionProfile extends Component {

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
                
                <Text style={[styles.textStyle,{color: this.state.activeTab == 0 ? GREEN : '#333333'}]}>Personal Information</Text>
            </TabHeading>
        );
    }

    academicHeading = () => {
        return (
            <TabHeading style={[styles.tabHeadingStyle, this.state.activeTab == 1 ? styles.activeTabHeadingStyle : {}]}>
                <Text style={[styles.textStyle,{color: this.state.activeTab == 1 ? GREEN : '#333333'}]}>   Employment Information </Text>
            </TabHeading>
        );
    }

    serviceHeading = () => {
        return (
            <TabHeading style={[styles.tabHeadingStyle, this.state.activeTab == 2 ? styles.activeTabHeadingStyle : {}]}>
                
                <Text style={[styles.textStyle,{color: this.state.activeTab == 2 ? GREEN : '#333333'}]}>Monthly Pension Information</Text>
            </TabHeading>
        );
    }

    paymentHeading = () => {
        return (
            <TabHeading style={[styles.tabHeadingStyle, this.state.activeTab == 3 ? styles.activeTabHeadingStyle : {}]}>
                <Text style={[styles.textStyle,{color: this.state.activeTab ==3 ? GREEN : '#333333'}]}>   Gratuity/Pension Information </Text>
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
                                    label={`Bippiis Number: `}
                                    data={user.lga_pensioners.bippiis_number}
                                />
                                <ProfileSection
                                    label={`Full Name: `}
                                    data={user.lga_pensioners.fullname}
                                />
                                <ProfileSection
                                    label={`Date of Birth: `}
                                    data={user.lga_pensioners.date_of_birth}
                                />
                                <ProfileSection
                                    label={`Gender: `}
                                    data={user.lga_pensioners.gender}
                                />
                                <ProfileSection
                                    label={`Phone: `}
                                    data={user.lga_pensioners.phone}
                                />
                                <ProfileSection
                                    label={`Category: `}
                                    data={user.lga_pensioners.category}
                                />
                                <ProfileSection
                                    label={`Permanent House Address: `}
                                    data={user.lga_pensioners.permanent_address}
                                />
                                <ProfileSection
                                    label={`Next Of Kin's Name: `}
                                    data={user.lga_pensioners.nok_name}
                                />
                                <ProfileSection
                                    label={`Next Of Kin's Phone: `}
                                    data={user.lga_pensioners.nok_phone}
                                />
                                <ProfileSection
                                    label={`Relationship with Next of kin: `}
                                    data={user.lga_pensioners.nok_relationship}
                                />
                                <ProfileSection
                                    label={`Next Of Kin's Address: `}
                                    data={user.lga_pensioners.nok_address}
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
                                    label={`Date of First Appointment: `}
                                    data={user.lga_pensioners.f_a_d}
                                />
                                <ProfileSection
                                    label={`Retirement Date: `}
                                    data={user.lga_pensioners.d_o_r}
                                />
                                <ProfileSection
                                    label={`Years Served: `}
                                    data={user.lga_pensioners.years_served}
                                />
                                <ProfileSection
                                    label={`Months Served: `}
                                    data={user.lga_pensioners.month_served}
                                />
                                <ProfileSection
                                    label={`Classification: `}
                                    data={user.lga_pensioners.classification}
                                />
                                <ProfileSection
                                    label={`Rank: `}
                                    data={user.lga_pensioners.rank}
                                />
                                <ProfileSection
                                    label={`Grade Level: `}
                                    data={user.lga_pensioners.grade_level}
                                />
                                <ProfileSection
                                    label={`Step: `}
                                    data={user.lga_pensioners.step}
                                />
                                <ProfileSection
                                    label={`Date Of Last Promotion: `}
                                    data={user.lga_pensioners.d_o_p}
                                />
                                <ProfileSection
                                    label={`Local Government of Retirement: `}
                                    data={user.lga_pensioners.lga_r}
                                />
                                <ProfileSection
                                    label={`Local Government of Origin: `}
                                    data={user.lga_pensioners.lga_o}
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
                                    label={`Pension Per Annum: `}
                                    data={user.lga_pensioners.p_p_a}
                                />
                                <ProfileSection
                                    label={`Initial Monthly Pension: `}
                                    data={user.lga_pensioners.i_m_p}
                                />
                                <ProfileSection
                                    label={`Current Monthly Pension: `}
                                    data={user.lga_pensioners.c_m_p}
                                />
                                <ProfileSection
                                    label={`Bank: `}
                                    data={user.lga_pensioners.bank}
                                />
                                <ProfileSection
                                    label={`Account Number: `}
                                    data={user.lga_pensioners.account_number}
                                />
                                <ProfileSection
                                    label={`BVN: `}
                                    data={user.lga_pensioners.bvn}
                                />
                                <ProfileSection
                                    label={`Payroll Status: `}
                                    data={user.lga_pensioners.payroll_status}
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
                                    label={`Total Amount Of Gratuity: `}
                                    data={user.lga_pensioners.t_a_g}
                                />
                                <ProfileSection
                                    label={`5 Years Death Pension Arrears: `}
                                    data={user.lga_pensioners.y_5_d}
                                />
                                <ProfileSection
                                    label={`Pension Arrears If Any: `}
                                    data={user.lga_pensioners.p_a}
                                />
                                <ProfileSection
                                    label={`Total 150% Pension Arrears `}
                                    data={user.lga_pensioners.p_150_a}
                                />
                                <ProfileSection
                                    label={`Total 30% Pension Arrears: `}
                                    data={user.lga_pensioners.p_30_a}
                                />
                                <ProfileSection
                                    label={`Federal Share If Any: `}
                                    data={user.lga_pensioners.fed_share}
                                />
                                <ProfileSection
                                    label={`Total 142% Pension Arrears: `}
                                    data={user.lga_pensioners.p_142_a}
                                />
                                <ProfileSection
                                    label={`Total Of Any Other Increment Arrears: `}
                                    data={user.lga_pensioners.other_areas}
                                />
                                <ProfileSection
                                    label={`Grand Total: `}
                                    data={user.lga_pensioners.grand_total}
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
            
    }
}

const mapStateToProps = (state) => {
    const {user} = state.boilerService.auth;
    return {user}
};

export default connect(mapStateToProps, {toggleImageViewModal, profileUpdate})(PensionProfile);
