
import {TOGGLESHOWIMAGEMODAL, TOGGLEIMAGEVIEWMODAL} from './../actions/types'

const INITIAL_STATE = {
    showImageModal: false,
    viewImageModal: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case TOGGLESHOWIMAGEMODAL:
            return { ...state,  showImageModal: action.payload};

        case TOGGLEIMAGEVIEWMODAL:
            return { ...state,  viewImageModal: action.payload};

        default: return state
    }
}
