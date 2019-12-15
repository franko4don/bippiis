import { PROFILE_UPDATE, PASSPORT_LOADING, GET_SINGLE_QUERY, QUERY_LOADING, GET_PAYMENT, PAYMENT_LOADING, GET_ERRORS, GET_ERROR_MESSAGE, PROFILE_LOADING, INSURANCE_LOADING, ATTENDANCE_LOADING, ID_LOADING, TRANSFER_LOADING, GET_SINGLE_TRANSFER, GET_TRANSFER, GET_QUERY } from './types'
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
                if(err.response.status == 404){
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


export const updatePensionProfile = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: PROFILE_LOADING,
            payload: true
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        client.post('pension/updateProfile', data)
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

export const verify = () => {
    
    return (dispatch) => {
        dispatch({
            type: ATTENDANCE_LOADING,
            payload: true
        });
        client.post('pension/verify', {author: config.author})
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
                if(err.response.status == 404){
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


export const getQueries = () => {
    
    return (dispatch) => {
        dispatch({
            type: QUERY_LOADING,
            payload: true
        });
        client.get('user/queries')
            .then(res => {
                dispatch({
                    type: QUERY_LOADING,
                    payload: false
                });

                dispatch({
                    type: GET_QUERY,
                    payload: res.data.data
                });
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: QUERY_LOADING,
                    payload: false
                });
               
                console.log(err.response, 'Response error');
            })
      
    }
}

export const getSingleQuery = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: QUERY_LOADING,
            payload: true
        });
        client.post('user/query', data)
            .then(res => {
                dispatch({
                    type: QUERY_LOADING,
                    payload: false
                });

                dispatch({
                    type: GET_SINGLE_QUERY,
                    payload: res.data.data
                });
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: QUERY_LOADING,
                    payload: false
                });
               
                console.log(err.response, 'Response error');
            })
      
    }
}

export const replyQuery = (data) => {
    
    return (dispatch) => {
        dispatch({
            type: QUERY_LOADING,
            payload: true
        });
        client.post('user/query/reply', data)
            .then(res => {
                dispatch({
                    type: QUERY_LOADING,
                    payload: false
                });

                dispatch(toggleSuccessModal(true));
            })
            .catch(err => {
                dispatch({
                    type: QUERY_LOADING,
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
}


export const getPayments = () => {
    
    return (dispatch) => {
        dispatch({
            type: PAYMENT_LOADING,
            payload: true
        });
        client.post('pension/payments', {author: config.author})
            .then(res => {
                dispatch({
                    type: PAYMENT_LOADING,
                    payload: false
                });

                dispatch({
                    type: GET_PAYMENT,
                    payload: res.data.data
                });
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: PAYMENT_LOADING,
                    payload: false
                });
               
                console.log(err.response, 'Response error');
            })
      
    }
}
// transfers
export const getTransfers = () => {
    
    return (dispatch) => {
        dispatch({
            type: TRANSFER_LOADING,
            payload: true
        });
        client.get('user/transfers')
            .then(res => {
                dispatch({
                    type: TRANSFER_LOADING,
                    payload: false
                });

                dispatch({
                    type: GET_TRANSFER,
                    payload: res.data.data
                });
                console.log(res, 'Response');
            })
            .catch(err => {
                dispatch({
                    type: TRANSFER_LOADING,
                    payload: false
                });
               
                console.log(err.response, 'Response error');
            })
    }
}

export const getSingleTransfer = (data) => {
    console.log(data);
    return (dispatch) => {
        dispatch({
            type: TRANSFER_LOADING,
            payload: true
        });
        client.post('user/transfer', data)
            .then(res => {
                console.log(res, 'Response');

                dispatch({
                    type: TRANSFER_LOADING,
                    payload: false
                });

                dispatch({
                    type: GET_SINGLE_TRANSFER,
                    payload: res.data.data
                });
                
            })
            .catch(err => {
                dispatch({
                    type: TRANSFER_LOADING,
                    payload: false
                });
               
                console.log(err.response, 'Response error');
            })
      
    }
}