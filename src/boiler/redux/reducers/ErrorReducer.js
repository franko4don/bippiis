
import {GET_ERROR_MESSAGE, GET_ERRORS} from './../actions/types'


const INITIAL_STATE = {
    message: '',
    errors: {}
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        
        case GET_ERROR_MESSAGE:
            return { ...state,  message: action.payload};

        case GET_ERRORS:
            return { ...state,  errors: action.payload};

        default: return state
    }
}
