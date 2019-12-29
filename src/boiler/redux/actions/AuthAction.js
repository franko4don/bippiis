import { 
    LOGIN_UPDATE, LOGIN_LOADING, LOGIN_USER, GET_USER, GET_ERRORS, 
    GET_ERROR_MESSAGE, USER_DATA_LOADING, LOGOUT_USER 
} from './types'
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
            .then(async (res) => {
                console.log(res);
                
                let detail = res.data.data;
                if(detail.verification_type == 0){
                    if(detail.has_password){
                        Actions.loginWithPassword();
                    }else{
                        Actions.createPassword();
                    }
                }else{
                    if(detail.has_enrolled){
                        // call function that processes fingerprint file
                        Actions.loginWithBiometrics();
                    }else{
                        Actions.enrolBiometrics();
                    }
                    
                }
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });
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
                if(res.data.data.category == 1){
                    Actions.reset('home');
                }else{
                    Actions.reset('pensionHome');
                }
                
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

export const loginWithBiometrics = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: LOGIN_LOADING,
            payload: true
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        client.post('loginUserWithFingerPrint',data)
            .then(res => {
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });

                dispatch({
                    type: LOGIN_USER,
                    payload: res.data
                });
                if(res.data.data.category == 1){
                    Actions.reset('home');
                }else{
                    Actions.reset('pensionHome');
                }
                
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
                if(res.data.data.category == 1){
                    Actions.reset('home');
                }else{
                    Actions.reset('pensionHome');
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
                console.log(err.response, 'Response error');
            })
      
    }
};


export const getUserData = () => {
    
    return (dispatch) => {
        dispatch({
            type: USER_DATA_LOADING,
            payload: true
        });
        client.get('user')
            .then(res => {
                dispatch({
                    type: GET_USER,
                    payload: res.data.data
                });
                dispatch({
                    type: USER_DATA_LOADING,
                    payload: false
                });
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: USER_DATA_LOADING,
                    payload: false
                });
                console.log(err.response, 'Response error');
            })
      
    }
};

export const enrollUserBiometrics = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: LOGIN_LOADING,
            payload: true
        });
        client.post('enroll', data)
            .then(res => {

                dispatch({
                    type: LOGIN_USER,
                    payload: res.data
                });

                if(res.data.data.category == 1){
                    Actions.reset('home');
                }else{
                    Actions.reset('pensionHome');
                }
            
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });
                console.log(err.response, 'Response error');
            })
      
    }
};

export const logoutUser = () => {
    
    return (dispatch) => {

        dispatch({
            type: LOGOUT_USER,

        });
        Actions.reset('login');
      
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
