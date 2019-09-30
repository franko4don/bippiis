import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, Animated, Easing, ImageBackground, Image, View, StatusBar, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
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
                <ImageModal/>
                <StatusBar translucent={true} backgroundColor={'transparent'}/>
                
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
                <View style={{padding: 15}}>
                    <Text style={{color: '#707070', fontSize: 24, fontFamily: FONTFAMILYREGULAR}}>Activities</Text>
                </View>
                <View style={{flexDirection: 'row', margin: 5,  justifyContent: 'space-between'}}>
                    <HomeSection onPress={() => Actions.camera()} name="Biometrics / Face Capture" image={ICONBIOMETRICS}/>
                    <HomeSection onPress={() => ToastAndroid.show('Feature is Coming Soon', ToastAndroid.SHORT)} name="Transfer History" image={ICONPROFILEUPDATE}/>
                    <HomeSection onPress={() => Actions.profile()} name="View Profile" image={ICONPROFILE}/>
                    <HomeSection onPress={() => ToastAndroid.show('Feature is Coming Soon', ToastAndroid.SHORT)} name="Promotion History" image={ICONPROFILEUPDATE}/>
                    <HomeSection onPress={() => ToastAndroid.show('Feature is Coming Soon', ToastAndroid.SHORT)} name="Fin Report" image={ICONFINANCIALREPORT}/>
                </View>

                <View style={{flexDirection: 'row', marginLeft: 5, marginRight: 5, marginTop: 20, justifyContent: 'space-between'}}>
                    <HomeSection onPress={() => ToastAndroid.show('Feature is Coming Soon', ToastAndroid.SHORT)} name="Attendance/Verification" image={ICONVERIFICATION}/>
                    <HomeSection onPress={() => Actions.query()} name="Queries" image={ICONFINANCIALREPORT}/>
                    <HomeSection onPress={() => ToastAndroid.show('Feature is Coming Soon', ToastAndroid.SHORT)} name="Appa Form" image={ICONPROFILE}/>
                    <HomeSection onPress={() => ToastAndroid.show('Feature is Coming Soon', ToastAndroid.SHORT)} name="Health Insurance" image={ICONHEALTH}/>
                    <HomeSection onPress={() => Actions.leave()} name="Apply for Leave" image={ICONATTENDANCE}/>
                   
                </View>
      
                
            </ScrollView>

        );
    }
}

const styles = {

}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, {})(Home);
