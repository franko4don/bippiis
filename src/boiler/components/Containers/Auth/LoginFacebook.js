import React, { Component } from 'react';
import {Text, ScrollView, NativeModules, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import RNAccountKit from 'react-native-facebook-account-kit';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import LinkedInModal from 'react-native-linkedin';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {boilerAuthenticate} from './../../../redux/actions';
import { Actions } from 'react-native-router-flux';

const { RNTwitterSignIn } = NativeModules;

const Constants = {
    
    TWITTER_COMSUMER_KEY: 'oNsrfUbCyFOnOP1yPVMO3VwV1',
    TWITTER_CONSUMER_SECRET: 'VSyBk6827Gc8Hp4LljNKe2nUirP9NIMgXqT83ukLKjO71Cka7p'
}

class LoginFacebook extends Component {

    componentWillMount(){
        RNAccountKit.configure({
            viewControllerMode: 'show',
            responseType: 'token', // 'token' by default,
            facebookNotificationsEnabled: true, // true by default
            readPhoneStateEnabled: true, // true by default,
            defaultCountry: 'NG',
            initialPhoneNumber: '',
            initialPhoneCountryPrefix: '',
            getACallEnabled: true,
            // setEnableInitialSmsButton: true,
            
          });
        this.props.boilerAuthenticate();
        //   this.loginWithAccountKit();
        //   this.twitterSignIn();
        
        // this.getGoogleUserProfile();
    }

    componentDidMount(){
        // this.handleFacebookLogin();
    }

    loginWithAccountKit(){
        RNAccountKit.loginWithPhone()
        .then((token) => {
          if (!token) {

          } else {
            console.log(token);
            RNAccountKit.getCurrentAccount()
            .then((account) => {
                 console.log(account)
                
            }).catch(err => console.log(err))
          }
        }).catch(err => {console.log(err);})
    }

    async getGoogleUserProfile() {

       
        GoogleSignin.configure({
            //  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
              webClientId: '645231926780-v6r8kkrah1f59fa3jfnimef3mhe300aj.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
              offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
              hostedDomain: '', // specifies a hosted domain restriction
              forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
              accountName: '', // [Android] specifies an account name on the device that should be used
          });

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);

        
        } catch (error) {
            console.log(error);
            
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    twitterSignIn = () => {
        
        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
        
        RNTwitterSignIn.logIn()
            .then(loginData => {         
                console.log(loginData, "returned data");
                const { authToken, authTokenSecret, email } = loginData
                if (authToken && authTokenSecret) {
                }
            })
            .catch(error => {
                console.log(error, "error occured")
            }
            )
    }

    handleFacebookLogin() {
        
        LoginManager.logInWithPermissions(["public_profile"])
            .then(result => {
                    console.log(result);
                if (result.isCancelled) {
                  
                    console.log('Login cancelled')
                } else {
                    this.getFacebookUserProfile();
                    console.log('Login success with permissions: ' + result.grantedPermissions.toString())
                }
                
            })
            .catch(err => {
               
                console.log(err)
            });
    }

    getFacebookUserProfile() {
        AccessToken.getCurrentAccessToken()
            .then((data) => {
                const { accessToken } = data;
                console.log(data);
                axios.get('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
                    .then(res => {
                        
                        console.log(res.data);
                        
                    })
                    .catch((err) => {
                        
                        console.log(err);
                    })
            })
            .catch(err => {
                
                console.log(err)
            });

    }

    getLinkedUserProfile(token) {
        let Authorization = 'Bearer ' + token.access_token;
        
        axios.get('https://api.linkedin.com/v2/me', {
            headers: {
                Authorization
            },
            

        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err.response);
        });
    }

    render() {
     
        return (
             
            <ScrollView style={{backgroundColor: '#8298bd', paddingTop: 40}}>
                <Text>Login with facebook</Text>
                <TouchableOpacity onPress={() => Actions.login()}>
                    <Text>Go to normal Login</Text>
                </TouchableOpacity>
                <LinkedInModal
                    clientID="869ksbwyn1cxdm"
                    clientSecret="NDXE2AmHrzW6p7TA"
                    redirectUri="https://abit.bluebecks.com/auth/linkedin/callback"
                    onError={(err) => { console.log(err) }}
                    onSuccess={(token) => { this.getLinkedUserProfile(token) }}
                    permissions={['r_liteprofile', 'r_emailaddress', 'w_member_social']}
                    linkText=" "
                    closeStyle={{ width: 23, height: 23, marginBottom: -4 }}
                    containerStyle={{}}
                    wrapperStyle={{}}
                    renderButton={() => <MaterialCommunityIcon name="linkedin" color='white' size={25} />}
                />
            </ScrollView>

        );
    }
}

const styles = {

}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, {boilerAuthenticate})(LoginFacebook);
