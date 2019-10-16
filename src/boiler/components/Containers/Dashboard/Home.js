import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, Animated, TouchableOpacity, Easing, DeviceEventEmitter, ImageBackground, Image, View, StatusBar, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { LOGO, ICONBIOMETRICS, ICONFACECAPTURE, ICONPROFILE, ICONPROFILEUPDATE, ICONFINANCIALREPORT, TRANSAPARENTBACKGROUND, GOVERNOR, ICONHEALTH, ICONATTENDANCE, ICONIDCARD, ICONVERIFICATION } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR, FONTFAMILYSEMIBOLD } from '../../../style/fonts';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import { HomeSection } from '../../Presenters/Home/HomeSection';
import { calculateOpacity } from '../../../../Helper';
import { Actions } from 'react-native-router-flux';
import ImageModal from '../Modals/ImageModal';
import FaceCaptureIcon from '../../../assets/svgs/FaceCaptureIcon';
import BiometricCaptureIcon from '../../../assets/svgs/BiometricCaptureIcon';
import TakeAttendancIcon from '../../../assets/svgs/TakeAttendanceIcon';
import ViewProfileIcon from '../../../assets/svgs/ViewProfileIcon';
import UpdateProfileIcon from '../../../assets/svgs/UpdateProfileIcon';
import FinancialReportIcon from '../../../assets/svgs/FinancialReportIcon';
import HealthInsuranceIcon from '../../../assets/svgs/HealthInsuranceIcon';
import StaffIdIcon from '../../../assets/svgs/StaffIdIcon';
import VasIcon from '../../../assets/svgs/VasIcon';
import {getUserData, logoutUser} from './../../../redux/actions';
import ErrorModal from '../Modals/ErrorModal';
import SuccessModal from '../Modals/SuccessModal';

const AnimatedView = Animated.createAnimatedComponent(View)

class Home extends Component {

    constructor(props){
        super(props);
        this.carousel = null;
        this.timer = null;
        this.count = 0;
        this.state = {
            activeQuote: {
                quote: 'Don’t simply retire from something; have something to retire to.',
                quoter: ' Harry Emerson Fosdick'
            },
            opacity: new Animated.Value(0.25),
            quotes: [
                {
                    quote: 'An unexamined life is not worth living',
                    quoter: ' St Augustine'
                },

                {
                    quote: 'The devil that slaughters the innocent is entirely suffering',
                    quoter: ' Wrath of Vajra (k29)'
                },
            ]
        }
    }

    componentWillMount(){
        this.animate();
        this.props.getUserData();
        DeviceEventEmitter.addListener('onIdle', (e) => {
            console.log(e);
            this.props.logoutUser()
        });
    }
    
    componentDidMount(){
        this.timer = setInterval(() => {
            this.count = this.count + 1;
            if(this.count >= this.state.quotes.length){
                this.count = 0;
            }
            
            this.setState({activeQuote: this.state.quotes[this.count], opacity: new Animated.Value(0.35)});
            this.animate();
        }, 10500);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        DeviceEventEmitter.removeListener('onIdle');
    }

    animate(){
      
        
            Animated.timing(this.state.opacity, {
              toValue: 1,
              duration: 10000,
              useNativeDriver: true,
              easing: Easing.linear
            }).start()
            
    }

    render() {
        const {width, height} = Dimensions.get('screen');
       
        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
              
                <ErrorModal/>
                <StatusBar translucent={true} backgroundColor={'transparent'}/>
                {this.props.userDataLoading ? <OverlayLoader/> : null}
                
                <ImageBackground 
                    source={TRANSAPARENTBACKGROUND}
                    style={{width: width, paddingTop: 20, paddingBottom: 20, backgroundColor: '#04751B'+calculateOpacity(95)}}
                    resizeMode={'stretch'}
                >
                <View style={{}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{ flex: 4, justifyContent: 'center'}}>
                            <AnimatedView style={{justifyContent: 'center', opacity: this.state.opacity}}>
                                <Text style={{color: WHITE, fontSize: 25, paddingLeft: 15, paddingTop: 10, lineHeight: 26}}>
                                    "
                                    {this.state.activeQuote.quote}
                                    "
                                </Text>
                                <Text style={{color: WHITE, fontSize: 12, paddingLeft: 15, paddingTop: 15}}>
                                    – {this.state.activeQuote.quoter}
                                </Text>
                            </AnimatedView>
                            
                        </View>
                        <View style={{paddingTop: 20, paddingBottom: 20, flex: 1, justifyContent: 'center'}}>
                            <Image
                                source={GOVERNOR}
                                style={{width: null, height: height / 4, marginBottom: -40}}
                                resizeMode={'stretch'}
                            />
                        </View>
                    </View>
                </View>
                </ImageBackground>
                <TouchableOpacity onPress={() => this.props.logoutUser()} style={{padding: 8, alignSelf: 'flex-end', marginTop: 5, marginRight: 5, flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center'}}>
                        <MaterialCommunityIcon name="power" size={22} color={'red'} />
                    </View>
                    
                    <View style={{justifyContent: 'center'}}>
                        <Text style={{paddingLeft: 5, fontSize: 16, color: 'red'}}>Logout</Text>
                    </View>
                    
                </TouchableOpacity>
                <View style={{padding: 15}}>
                    <Text style={{color: '#707070', fontSize: 24, fontFamily: FONTFAMILYREGULAR}}>Activities</Text>
                </View>
                <View style={{flexDirection: 'row', margin: 5,  justifyContent: 'space-between'}}>
                    <HomeSection 
                        onPress={() => {
                            if(this.props.user.civil_servants.face_capture){
                                ToastAndroid.show('You have already completed face capture', ToastAndroid.SHORT);
                            }else{
                                Actions.camera();
                            }
                            
                        }}
                        name="Face Capture" 
                    image={<FaceCaptureIcon/>}/>
                    <HomeSection onPress={() => ToastAndroid.show('Feature is Coming Soon', ToastAndroid.SHORT)} name="Biometric Capture" image={<BiometricCaptureIcon/>}/>
                    <HomeSection onPress={() => Actions.attendance()} name="Take Attendance" image={<TakeAttendancIcon/>}/>
                    <HomeSection onPress={() => Actions.profile()} name="View Profile" image={<ViewProfileIcon/>}/>
                    <HomeSection onPress={() => Actions.updateProfile()} name="Update Profile" image={<UpdateProfileIcon/>}/>
                </View>

                <View style={{flexDirection: 'row', marginLeft: 5, marginRight: 5, marginTop: 20, justifyContent: 'space-between'}}>
                    <HomeSection onPress={() => ToastAndroid.show('Feature is Coming Soon', ToastAndroid.SHORT)} name="Financial Report" image={<FinancialReportIcon/>}/>
                    <HomeSection onPress={() => Actions.insurance()} name="Health Insurance" image={<HealthInsuranceIcon/>}/>
                    <HomeSection onPress={() => Actions.staffid()} name="Staff Identity Card" image={<StaffIdIcon/>}/>
                    <HomeSection onPress={() => ToastAndroid.show('Feature is Coming Soon', ToastAndroid.SHORT)} name="Pencom Status" image={<StaffIdIcon/>}/>
                    <HomeSection onPress={() => ToastAndroid.show('Feature is Coming Soon', ToastAndroid.SHORT)} name="Value Added Services" image={<VasIcon/>}/>
                   
                </View>
      
                
            </ScrollView>

        );
    }
}

const styles = {

}

const mapStateToProps = (state) => {
    const {user} = state.boilerService.auth;
    const {userDataLoading} = state.boilerService.loader;
    return {user, userDataLoading}
};

export default connect(mapStateToProps, {getUserData, logoutUser})(Home);
