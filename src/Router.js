import React, { Component } from 'react';
import {View, Platform, TouchableHighlight, Alert, StyleSheet} from 'react-native';
import { Scene, Router, Stack} from 'react-native-router-flux';
import { connect } from 'react-redux';
import Login from './boiler/components/Containers/Auth/Login';
import PushService from './PushService';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import boilerScenes from './boiler/routes/index';
import Splashscreen from 'react-native-splash-screen';
import ViewImage from './boiler/components/Containers/Profile/ViewImage';

class RouterComponent extends Component {

    constructor(props) {
        super();
       this.state = {
            permissions: {},
       }
    }

    componentWillMount(){
        // Splashscreen.hide();
    }

    // UNSAFE_componentWillMount() {
    //     PushNotificationIOS.addEventListener('register', this._onRegistered);
    //     PushNotificationIOS.addEventListener(
    //       'registrationError',
    //       this._onRegistrationError,
    //     );
    //     PushNotificationIOS.addEventListener(
    //       'notification',
    //       this._onRemoteNotification,
    //     );
    //     PushNotificationIOS.addEventListener(
    //       'localNotification',
    //       this._onLocalNotification,
    //     );
    
   
    //   }
    
    //   componentWillUnmount() {
    //     PushNotificationIOS.removeEventListener('register', this._onRegistered);
    //     PushNotificationIOS.removeEventListener(
    //       'registrationError',
    //       this._onRegistrationError,
    //     );
    //     PushNotificationIOS.removeEventListener(
    //       'notification',
    //       this._onRemoteNotification,
    //     );
    //     PushNotificationIOS.removeEventListener(
    //       'localNotification',
    //       this._onLocalNotification,
    //     );
    //   }


    componentDidMount(){
        PushService.setCallbacks((device) => console.log(device, 'okies'), 
            (notification) => {
                alert(JSON.stringify(notification));
                console.log(notification);
        });
        if(Platform.OS == 'ios'){
            // this._sendLocalNotification();
        }
        
    }


//   _sendNotification() {
//     require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
//       remote: true,
//       aps: {
//         alert: 'Sample notification',
//         badge: '+1',
//         sound: 'default',
//         category: 'REACT_NATIVE',
//         'content-available': 1,
//       },
//     });
//   }

//   _sendLocalNotification() {
//     PushNotificationIOS.presentLocalNotification({
//       alertBody: 'Sample local notification',
//       applicationIconBadgeNumber: 1
//     });
//   }

//   _onRegistered(deviceToken) {
//       console.log(deviceToken, 'device token');
//     Alert.alert(
//       'Registered For Remote Push',
//       `Device Token: ${deviceToken}`,
//       [
//         {
//           text: 'Dismiss',
//           onPress: null,
//         },
//       ],
//     );
//   }

//   _onRegistrationError(error) {
//     Alert.alert(
//       'Failed To Register For Remote Push',
//       `Error (${error.code}): ${error.message}`,
//       [
//         {
//           text: 'Dismiss',
//           onPress: null,
//         },
//       ],
//     );
//   }

//   _onRemoteNotification(notification) {
//     const result = `Message: ${notification.getMessage()};\n
//       badge: ${notification.getBadgeCount()};\n
//       sound: ${notification.getSound()};\n
//       category: ${notification.getCategory()};\n
//       content-available: ${notification.getContentAvailable()}.`;

//     Alert.alert('Push Notification Received', result, [
//       {
//         text: 'Dismiss',
//         onPress: null,
//       },
//     ]);
//   }

//   _onLocalNotification(notification) {
//     Alert.alert(
//       'Local Notification Received',
//       'Alert message: ' + notification.getMessage(),
//       [
//         {
//           text: 'Dismiss',
//           onPress: null,
//         },
//       ],
//     );
//   }

  _showPermissions() {
    PushNotificationIOS.checkPermissions(permissions => {
      this.setState({permissions});
    });
  }

    render() {
        return (
             
                <Router>     
                    <Scene key="root" hideNavBar>
                        {/* <Scene key={'image'} component={ViewImage} /> */}
                        {/* Register user routes */}
                        {boilerScenes.map(item => {
                            return item;
                        })}

                    </Scene>
                </Router>
          
        );
    }
}

const styles = {


}

const mapStateToProps = (state) => {
    return {}
};

export default RouterComponent;
