import { PROFILE_UPDATE, PASSPORT_LOADING, GET_ERRORS, GET_ERROR_MESSAGE, PROFILE_LOADING, INSURANCE_LOADING, ATTENDANCE_LOADING, ID_LOADING } from './types'
import client from './../../rclient/client';
import config from './../config';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { toggleSuccessModal, toggleErrorModal } from './ModalAction';

export const profileUpdate = (payload) => {

    return {
        type: PROFILE_UPDATE,
        payload
    }
};

export const applyForInsurance = () => {
    
    return (dispatch) => {
        dispatch({
            type: INSURANCE_LOADING,
            payload: true
        });
        client.post('user/applyForInsurance', {author: config.author})
            .then(res => {
                dispatch({
                    type: INSURANCE_LOADING,
                    payload: false
                });
                dispatch(toggleSuccessModal(true));
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: INSURANCE_LOADING,
                    payload: false
                });
                if(err.response.status == 409){
                    dispatch(toggleErrorModal(true));
                    dispatch({
                        type: GET_ERROR_MESSAGE,
                        payload: err.response.data.message
                    });
                }
                
                console.log(err.response, 'Response error');
            })
      
    }
};

export const applyForId = () => {
    
    return (dispatch) => {
        dispatch({
            type: ID_LOADING,
            payload: true
        });
        client.post('user/applyForIdCard', {author: config.author})
            .then(res => {
                dispatch({
                    type: ID_LOADING,
                    payload: false
                });
                dispatch(toggleSuccessModal(true));
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: ID_LOADING,
                    payload: false
                });
                if(err.response.status == 409){
                    dispatch(toggleErrorModal(true));
                    dispatch({
                        type: GET_ERROR_MESSAGE,
                        payload: err.response.data.message
                    });
                }
                console.log(err.response, 'Response error');
            })
      
    }
};

export const markAttendance = () => {
    
    return (dispatch) => {
        dispatch({
            type: ATTENDANCE_LOADING,
            payload: true
        });
        client.post('user/markAttendance', {author: config.author})
            .then(res => {
                dispatch({
                    type: ATTENDANCE_LOADING,
                    payload: false
                });
                dispatch(toggleSuccessModal(true));
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: ATTENDANCE_LOADING,
                    payload: false
                });
                if(err.response.status == 409){
                    dispatch(toggleErrorModal(true));
                    dispatch({
                        type: GET_ERROR_MESSAGE,
                        payload: err.response.data.message
                    });
                }
                console.log(err.response, 'Response error');
            })
      
    }
};

export const uploadPassport = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: PASSPORT_LOADING,
            payload: true
        });
        client.post('user/uploadPassport', data)
            .then(res => {
                dispatch({
                    type: PASSPORT_LOADING,
                    payload: false
                });
                dispatch(toggleSuccessModal(true));
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: PASSPORT_LOADING,
                    payload: false
                });
                console.log(err.response, 'Response error');
            })
      
    }
};

export const updateProfile = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: PROFILE_LOADING,
            payload: true
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        client.post('user/updateProfile', data)
            .then(res => {
                dispatch({
                    type: PROFILE_LOADING,
                    payload: false
                });
                dispatch(toggleSuccessModal(true));
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: PROFILE_LOADING,
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

export const updateQualification = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: PROFILE_LOADING,
            payload: true
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        client.post('user/updateQualification', data)
            .then(res => {
                dispatch({
                    type: PROFILE_LOADING,
                    payload: false
                });
                dispatch(toggleSuccessModal(true));
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: PROFILE_LOADING,
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


export const updateDocument = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: PROFILE_LOADING,
            payload: true
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        client.post('user/updateDocument', data)
            .then(res => {
                dispatch({
                    type: PROFILE_LOADING,
                    payload: false
                });
                dispatch(toggleSuccessModal(true));
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: PROFILE_LOADING,
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


