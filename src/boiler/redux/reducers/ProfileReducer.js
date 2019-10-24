
import {PROFILE_UPDATE, GET_PAYMENT} from './../actions/types'


const INITIAL_STATE = {
    activeImage: '',
    payments: []
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        
        case PROFILE_UPDATE:
            return { ...state,  [action.payload.prop]: action.payload.value};

        case GET_PAYMENT:
            return {...state, payments: action.payload}

        default: return state
    }
}
