import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, TouchableOpacity, ImageBackground, Image, View, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { WHITE, BACKGROUND, GREEN, RED, GRAY } from '../../../style/colors';
import { Text, RoundedInput, RoundedButton, UploadButton } from '../../Reusables';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';
import { ProfileSection } from '../../Presenters/Profile/ProfileSection';
import { LOGOTRANSPARENT, DOCUMENT } from '../../../style/images'
import {getPayments} from './../../../redux/actions';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import moment from 'moment';
import { formatMoney, calculateOpacity } from '../../../../Helper';
import { FONTFAMILYSEMIBOLD, FONTFAMILYBLACK } from '../../../style/fonts';

class PensionPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
        
        }
        this.data = {}
    }

    componentWillMount(){
       this.props.getPayments();
    }

    renderPayments(){
        const {payments} = this.props;
        let gratuity = 0;
        let pension = 0;
        let fullpayments =  payments.map((item, index) => {
        if(item.description == 'Gratuity'){
            gratuity+=item.amount;
        }else{
            pension+=item.amount;
        }
        return(
            <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={[styles.rowStyle,{flex: 2}]}>
                    <Text style={[styles.textStyle]}>{index + 1}</Text>
                </View>
                <View style={styles.rowStyle}>
                    <Text style={styles.textStyle}>{moment(item.date_paid, 'YYYY-MM-DD').format('Do MMMM, YYYY')}</Text>
                </View>
                <View style={[styles.rowStyle, {flex: 7}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={[{flex: 1}, styles.viewStyle]}>
                            <Text style={styles.textStyle}>{item.description == 'Gratuity' ? '✔': ''}</Text>
                        </View>
                        <View style={[{flex: 1}, styles.viewStyle]}>
                            <Text style={styles.textStyle}>{item.description == 'Pension' ? '✔': ''}</Text>
                        </View>

                    </View>
                    
                </View>
            
                <View style={[styles.rowStyle, {flex: 8}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={[{flex: 1}, styles.viewStyle]}>
                            <Text style={[styles.textStyle, {textAlign: 'left', paddingLeft: 5}]}>{item.description == 'Gratuity' ? '₦ '+formatMoney(item.amount, '.', '.'): '₦ '+formatMoney(0, '.', '.')}</Text>
                        </View>
                        <View style={[{flex: 1}, styles.viewStyle]}>
                            <Text style={[styles.textStyle, {textAlign: 'left', paddingLeft: 5}]}>{item.description == 'Pension' ? '₦ '+formatMoney(item.amount, '.', '.'): '₦ '+formatMoney(0, '.', '.')}</Text>
                        </View>

                    </View>
                    
                </View>
            </View>
        )
             
        });

        fullpayments.push(
            (<View key={'EFfce'} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={[styles.rowStyle,{flex: 2}]}>
                    <Text style={[styles.textStyle]}></Text>
                </View>
                <View style={styles.rowStyle}>
                    <Text style={styles.textStyle}></Text>
                </View>
                <View style={[styles.rowStyle, {flex: 7}]}>
                    <View style={{borderBottomWidth: 1, borderColor: GRAY}}>
                        <Text style={styles.textStyle}>Total</Text>
                    </View>
                    
                    
                </View>
            
                <View style={[styles.rowStyle, {flex: 8}]}>
                    <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: GRAY, justifyContent: 'space-between'}}>
                        <View style={[{flex: 1}, styles.viewStyle]}>
                            <Text style={[styles.textStyle, {textAlign: 'left', paddingLeft: 5}]}>{'₦ '+formatMoney(gratuity, '.', '.')}</Text>
                        </View>
                        <View style={[{flex: 1}, styles.viewStyle]}>
                            <Text style={[styles.textStyle, {textAlign: 'left', paddingLeft: 5}]}>{'₦ '+formatMoney(pension, '.', '.')}</Text>
                        </View>

                    </View>
                    
                </View>
            </View>)
        )
        return fullpayments;
    }

    render() {
        const {lga_pensioners} = this.props.user;
        return (
            
            <Container contentContainerStyle={{flexGrow: 1}}  style={{backgroundColor: BACKGROUND}}>
                <StatusBar translucent={false} backgroundColor={WHITE} barStyle="dark-content"/>
               {this.props.paymentLoading ? <OverlayLoader/> : null}
             
   
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} style={{backgroundColor: BACKGROUND, padding: 15,}}>
                <ImageBackground
                    source={LOGOTRANSPARENT}
                    style={{width: null, flex: 1}}
                    resizeMode={'contain'}
                >
                    <View style={{marginTop: 20, marginBottom: 30}}>
                        
                            <Text style={{color: GREEN, fontSize: 16, marginBottom: 10}}>
                                Total Gratuity Owed: 
                                <Text style={{color: '#000000'+calculateOpacity(80)}}>{' ₦ '+formatMoney(lga_pensioners.t_g_o, '.', '.')}</Text>
                            </Text>
                            <Text style={{color: GREEN, fontSize: 16, marginBottom: 10}}>
                                Total Pension Arrears Owed: 
                                <Text style={{color: '#000000'+calculateOpacity(80)}}>{' ₦ '+formatMoney(lga_pensioners.t_p_a, '.', '.')}</Text>
                            </Text>

                            <Text style={{color: GREEN, fontSize: 16, marginBottom: 10}}>
                                Total Amount Owed: 
                                <Text style={{color: '#000000'+calculateOpacity(80)}}>{' ₦ '+formatMoney(lga_pensioners.t_a_o, '.', '.')}</Text>
                            </Text>

                            <Text style={{color: GREEN, fontSize: 16, marginBottom: 10}}>
                                Amount Collected After Retirement: 
                                <Text style={{color: '#000000'+calculateOpacity(80)}}>{' ₦ '+formatMoney(lga_pensioners.a_c_r, '.', '.')}</Text>
                            </Text>
                           
                        
                  
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={[styles.rowStyle,{flex: 2}]}>
                            <Text style={[styles.textStyle, {fontFamily: FONTFAMILYBLACK}]}>S/N</Text>
                        </View>
                        <View style={styles.rowStyle}>
                            <Text style={[styles.textStyle, {fontFamily: FONTFAMILYBLACK}]}>Date Paid</Text>
                        </View>
                        <View style={[styles.rowStyle, {flex: 7}]}>
                            <View style={{borderBottomWidth: 1, borderColor: GRAY}}>
                            <Text style={[styles.textStyle, {fontFamily: FONTFAMILYBLACK}]}>Description Of Payment</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={[{flex: 1}, styles.viewStyle]}>
                                    <Text style={[styles.textStyle, {fontFamily: FONTFAMILYBLACK}]}>Gratuity</Text>
                                </View>
                                <View style={[{flex: 1}, styles.viewStyle]}>
                                    <Text style={[styles.textStyle, {fontFamily: FONTFAMILYBLACK}]}>Pension Arrears</Text>
                                </View>

                            </View>
                            
                        </View>
                    
                        <View style={[styles.rowStyle, {flex: 8}]}>
                            <View style={{borderBottomWidth: 1, borderColor: GRAY}}>
                                <Text style={[styles.textStyle, {fontFamily: FONTFAMILYBLACK}]}>Amount Paid</Text>
                            </View>
                            
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={[{flex: 1}, styles.viewStyle]}>
                                    <Text style={[styles.textStyle, {fontFamily: FONTFAMILYBLACK}]}>Gratuity</Text>
                                </View>
                                <View style={[{flex: 1}, styles.viewStyle]}>
                                    <Text style={[styles.textStyle, {fontFamily: FONTFAMILYBLACK}]}>Pension Arrears</Text>
                                </View>

                            </View>
                            
                        </View>
                    </View>
                    {this.renderPayments()}
                
                
                </ImageBackground>
                </ScrollView>

            </Container>
        )


    }
}

const styles = {
    
    rowStyle: {
        flex: 4,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: GRAY
    },

    viewStyle: {
        borderRightWidth: 1,
        borderColor: GRAY,
    },

    textStyle: {
        fontSize: 14, 
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
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
    const {paymentLoading} = state.boilerService.loader;
    const {errors} = state.boilerService.error;
    const {payments} = state.boilerService.profile;
    console.log(payments, "Payments");
    return {user, paymentLoading, errors, payments}
};

export default connect(mapStateToProps, {getPayments})(PensionPayment);
