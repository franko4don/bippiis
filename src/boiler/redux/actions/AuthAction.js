import { LOGIN_UPDATE, LOGIN_LOADING, LOGIN_USER, GET_USER, GET_ERRORS, GET_ERROR_MESSAGE } from './types'
import client from './../../rclient/client';
import config from './../config';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { toggleErrorModal } from './ModalAction';

export const loginUpdate = (payload) => {

    return {
        type: LOGIN_UPDATE,
        payload
    }
};

export const authenticateUser = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: LOGIN_LOADING,
            payload: true
        })
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        
        client.post('auth',data)
            .then(res => {
                console.log(res);
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });
                let detail = res.data.data;
                if(detail.verification_type == 0){
                    if(detail.has_password){
                        Actions.loginWithPassword();
                    }else{
                        Actions.createPassword();
                    }
                }else{
                    Actions.loginWithBiometrics();
                }
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });
                if(err.response.status == 422){
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data.errors
                    })
                }
                if(err.response.status == 409 || err.response.status == 404 || err.response.status == 401){
                    dispatch(toggleErrorModal(true));
                    dispatch({
                        type: GET_ERROR_MESSAGE,
                        payload: err.response.data.message
                    });
                }
                console.log(err.response);
            })
      
    }
};

export const loginUser = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: LOGIN_LOADING,
            payload: true
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        client.post('loginUser',data)
            .then(res => {
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });

                dispatch({
                    type: LOGIN_USER,
                    payload: res.data
                });
                Actions.reset('home');
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });

                if(err.response.status == 409 || err.response.status == 404 || err.response.status == 401){
                    dispatch(toggleErrorModal(true));
                    dispatch({
                        type: GET_ERROR_MESSAGE,
                        payload: err.response.data.message
                    });
                }

                if(err.response.status == 422){
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data.errors
                    })
                }
                console.log(err.response, 'Response error');
            })
      
    }
};

export const createPassword = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: LOGIN_LOADING,
            payload: true
        })
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        client.post('createPassword',data)
            .then(res => {
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });
                dispatch({
                    type: LOGIN_USER,
                    payload: res.data
                });
                Actions.reset('home');
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });
                if(err.response.status == 422){
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data.errors
                    })
                }
                console.log(err.response, 'Response error');
            })
      
    }
};


export const getUserData = () => {
    
    return (dispatch) => {

        client.get('user')
            .then(res => {
                dispatch({
                    type: GET_USER,
                    payload: res.data.data
                });
                console.log(res, 'Response');
            })
            .catch(err => {
                
                console.log(err.response, 'Response error');
            })
      
    }
};

export const boilerAuthenticate = () => {
    
    return (dispatch) => {

        client.get(config.apiUrl)
            .then(res => {
                console.log(res, 'Response');
            })
            .catch(err => {
                
                console.log(err.response, 'Response error');
            })
      
    }
};
