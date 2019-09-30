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

export default scenes = [
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
            name="login"
            key="home"
            component={Home}
        />,
        <Scene 
            name="login"
            key="login"
            initial
            component={Login}
        />

    ]
