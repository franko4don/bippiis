
import {CAPTURE_UPDATE} from './../actions/types'


const INITIAL_STATE = {
    image: ''
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        
        case CAPTURE_UPDATE:
            return { ...state,  [action.payload.prop]: action.payload.value};

        default: return state
    }
}
