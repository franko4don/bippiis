import { LOGIN_UPDATE, TOGGLESHOWIMAGEMODAL, TOGGLEIMAGEVIEWMODAL } from './types'


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

