
import {PROFILE_UPDATE, GET_PAYMENT, GET_TRANSFER, GET_QUERY, GET_SINGLE_QUERY, GET_SINGLE_TRANSFER} from './../actions/types'


const INITIAL_STATE = {
    activeImage: '',
    payments: [],
    transfers: [],
    singleQuery: {},
    singleTransfer: {},
    queries: []
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        
        case PROFILE_UPDATE:
            return { ...state,  [action.payload.prop]: action.payload.value};

        case GET_PAYMENT:
            return {...state, payments: action.payload}

        case GET_TRANSFER:
            return {...state, transfers: action.payload}

        case GET_QUERY:
            return {...state, queries: action.payload}

        case GET_SINGLE_QUERY:
            return {...state, singleQuery: action.payload}

        case GET_SINGLE_TRANSFER:
            return {...state, singleTransfer: action.payload}

        default: return state
    }
}
