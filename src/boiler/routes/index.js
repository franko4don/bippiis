import React, { Component } from 'react';
import { Scene } from 'react-native-router-flux';
import Login from '../components/Containers/Auth/Login';
import Home from '../components/Containers/Dashboard/Home';
import Profile from '../components/Containers/Profile/Profile';
import { FONTFAMILYSEMIBOLD } from '../style/fonts';
import { FONTFAMILYREGULAR } from '../../fonts';
import SQLiteDemo from '../components/Containers/Db/SQLiteDemo';
import Camera from '../components/Containers/Utils/Camera';
import Query from '../components/Containers/Query/Query';
import Leave from '../components/Containers/Leave/Leave';
import ViewImage from '../components/Containers/Profile/ViewImage';
import CreatePassword from '../components/Containers/Auth/CreatePassword';
import LoginWithPassword from '../components/Containers/Auth/LoginWithPassword';
import Insurance from '../components/Containers/Vas/Insurance';
import StaffId from '../components/Containers/Vas/StaffId';
import Attendance from '../components/Containers/Vas/Attendance';
import UpdateProfile from '../components/Containers/Profile/UpdateProfile';
import PensionHome from '../components/Containers/Dashboard/PensionHome';
import PensionProfile from '../components/Containers/Profile/PensionProfile';
import UpdatePensionProfile from '../components/Containers/Profile/UpdatePensionProfile';
import Verification from '../components/Containers/Vas/Verification';
import PensionPayment from '../components/Containers/Profile/PensionPayment';
import SingleQuery from '../components/Containers/Query/SingleQuery';
import Transfer from '../components/Containers/Transfer/Transfer';
import SingleTransfer from '../components/Containers/Transfer/SingleTransfer';
import Pencom from '../components/Containers/Pencom/Pencom';

export default scenes = [
        <Scene 
            name="login"
            key="login"
            // initial
            component={Login}
        />,
        <Scene 
            name="createPassword"
            key="createPassword"
            // initial
            component={CreatePassword}
        />,
        <Scene 
            name="loginWithPassword"
            key="loginWithPassword"
            // initial
            component={LoginWithPassword}
        />,
        <Scene 
            name="camera"
            key="camera"
            
            component={Camera}
        />,
        <Scene 
            name="profile"
            key="profile"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Bio Data'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={Profile}
        />,
        <Scene 
            name="pensionProfile"
            key="pensionProfile"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Bio Data'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={PensionProfile}
        />,
        <Scene 
            name="Query"
            key="query"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Query'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={Query}
        />,
        <Scene 
            name="Transfer"
            key="transfer"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Transfer'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={Transfer}
        />,
        <Scene 
            name="Leave"
            key="leave"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Leave Application'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={Leave}
        />,
        <Scene 
            name="view Image"
            key="viewImage"
            // initial
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Face Capture'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={ViewImage}
        />,
        <Scene 
            name="insurance"
            key="insurance"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            // initial
            navigationBarStyle={{elevation: 5}}
            title={'Apply for Insurance'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={Insurance}
        />,
        <Scene 
            name="staffid"
            key="staffid"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            // initial
            navigationBarStyle={{elevation: 5}}
            title={'ID Application'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={StaffId}
        />,
        <Scene 
            name="attendance"
            key="attendance"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Mark Attendance'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={Attendance}
        />,
        <Scene 
            name="verification"
            key="verification"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Verify'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={Verification}
        />,
        <Scene 
            name="updateProfile"
            key="updateProfile"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Bio Data'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={UpdateProfile}
        />,
        <Scene 
            name="pensionPayment"
            key="pensionPayment"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Financial Record'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={PensionPayment}
        />,
        <Scene 
            name="updatePensionProfile"
            key="updatePensionProfile"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Bio Data'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={UpdatePensionProfile}
        />,
        <Scene 
            name="pencom"
            key="pencom"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Pencom Status'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={Pencom}
        />,
        <Scene 
            name="singleQuery"
            key="singleQuery"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Query Detail'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={SingleQuery}
        />,
        <Scene 
            name="singleTransfer"
            key="singleTransfer"
            back={true}
            backButtonTintColor={'#7B7B7B'}
            navigationBarStyle={{elevation: 5}}
            title={'Transfer Detail'}
            titleStyle={{color: '#7B7B7B', fontFamily: FONTFAMILYREGULAR, fontWeight: 'normal'}}
            hideNavBar={false}
            component={SingleTransfer}
        />,
        <Scene 
            name="home"
            key="home"
            component={Home}
        />,
        <Scene 
            name="pensionHome"
            key="pensionHome"
            component={PensionHome}
        />,
        

    ]
