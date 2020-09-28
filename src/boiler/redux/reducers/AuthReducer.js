
import {LOGIN_UPDATE, GET_USER, LOGIN_USER, LOGOUT_USER} from './../actions/types'
import axios from './../../rclient/client';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const INITIAL_STATE = {
    password: '',
    password_confirmation: '',
    bippiis_number: '',
    user: {},
    auth: false,
    token: '',
    firebaseToken: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOGIN_UPDATE:
            return { ...state,  [action.payload.prop]: action.payload.value};

        case LOGIN_USER:
            storeUserData(action.payload);
            return { 
                ...state, auth: true,
                 token: action.payload.token, 
                 user: action.payload.data,
                 bippiis_number: '',
                 password: ''
                };

        case LOGOUT_USER:
                return {
                    ...state, 
                    bippiis_number: '',
                    password: '',
                    password_confirmation: '',
                    user: {}
                }

        case GET_USER:
            return {...state, user: action.payload}

        default: return state
    }
}


const storeUserData = (payload) => {
    AsyncStorage.setItem('token', payload.token);
    activateAxios(payload);
}

const activateAxios = (payload) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+payload.token;
    
}

const deleteUserData = () => {
    delete axios.defaults.headers.common['Authorization'];
}