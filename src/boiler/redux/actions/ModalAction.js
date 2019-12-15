import { LOGIN_UPDATE, TOGGLESHOWIMAGEMODAL, TOGGLEPENCOMMODAL, TOGGLEERRORMODAL, TOGGLEIMAGEVIEWMODAL, TOGGLESUCCESSMODAL } from './types'


export const toggleShowImageModal = (payload) => {
    
    return (dispatch) => {

        dispatch({
            type: TOGGLESHOWIMAGEMODAL,
            payload
        })
      
    }
};

export const toggleImageViewModal = (payload) => {
    
    return (dispatch) => {

        dispatch({
            type: TOGGLEIMAGEVIEWMODAL,
            payload
        })
      
    }
};

export const toggleSuccessModal = (payload) => {
    
    return (dispatch) => {

        dispatch({
            type: TOGGLESUCCESSMODAL,
            payload
        })
      
    }
};

export const toggleErrorModal = (payload) => {
    
    return (dispatch) => {

        dispatch({
            type: TOGGLEERRORMODAL,
            payload
        })
      
    }
};

export const togglePencomModal = (payload) => {
    
    return (dispatch) => {

        dispatch({
            type: TOGGLEPENCOMMODAL,
            payload
        })
      
    }
};


