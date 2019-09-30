import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import {BackHandler, Text, TextInput, Alert, PushNotificationIOS, StatusBar} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import store from './store';
import Router from './Router';
import codePush from "react-native-code-push";
import { MenuProvider } from 'react-native-popup-menu';
import PushService from './PushService';

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

class App extends Component {
    
    constructor(props){
        super(props);
        
        this.SetDefaultFontFamily();
        
    }

    SetDefaultFontFamily = () => {
        let components = [Text, TextInput]
        
    }



    componentWillMount(){
 
    }

    componentDidMount() {
        PushService.configure();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
     
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        
      }

    handleBackButton = () => {
       
        if(Actions.state.index > 0){
            Actions.pop();
            return true;
        }
        Alert.alert(
            'EXIT BIIPPSS APPLICATION',
            '', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
                cancelable: false
            }
        )
        return true;
    }
   
    render() {

        return (
            <MenuProvider skipInstanceCheck={true}>
                <Provider store={store}>
                    <Router />

                </Provider>
            </MenuProvider>
        )
    }
}

MyApp = codePush(codePushOptions)(App);
export default MyApp;
