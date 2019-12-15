
import {TOGGLESHOWIMAGEMODAL, TOGGLESUCCESSMODAL, TOGGLEIMAGEVIEWMODAL, TOGGLEERRORMODAL, TOGGLEPENCOMMODAL} from './../actions/types'

const INITIAL_STATE = {
    showImageModal: false,
    viewImageModal: false,
    showSuccessModal: false,
    showErrorModal: false,
    showPencomModal: false
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

        case TOGGLEPENCOMMODAL:
            return {...state, showPencomModal: action.payload}

        default: return state
    }
}
