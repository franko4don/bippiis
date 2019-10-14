
import {TOGGLESHOWIMAGEMODAL, TOGGLESUCCESSMODAL, TOGGLEIMAGEVIEWMODAL, TOGGLEERRORMODAL} from './../actions/types'

const INITIAL_STATE = {
    showImageModal: false,
    viewImageModal: false,
    showSuccessModal: false,
    showErrorModal: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case TOGGLESHOWIMAGEMODAL:
            return { ...state,  showImageModal: action.payload};

        case TOGGLEIMAGEVIEWMODAL:
            return { ...state,  viewImageModal: action.payload};

        case TOGGLESUCCESSMODAL:
            return { ...state,  showSuccessModal: action.payload};

        case TOGGLEERRORMODAL:
            return {...state, showErrorModal: action.payload}

        default: return state
    }
}
