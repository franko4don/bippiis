
import {
    LOGIN_LOADING, INSURANCE_LOADING, ID_LOADING, 
    USER_DATA_LOADING, PASSPORT_LOADING, ATTENDANCE_LOADING, 
    PROFILE_LOADING,
    PAYMENT_LOADING,
    TRANSFER_LOADING,
    QUERY_LOADING
} from './../actions/types'


const INITIAL_STATE = {
    loginLoading: false,
    insuranceLoading: false,
    idLoading: false,
    passportLoading: false,
    attendanceLoading: false,
    profileLoading: false,
    userDataLoading: false,
    paymentLoading: false,
    transferLoading: false,
    queryLoading: false
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        
        case LOGIN_LOADING:
            return { ...state,  loginLoading: action.payload};

        case INSURANCE_LOADING:
            return {...state, insuranceLoading: action.payload}

        case ID_LOADING:
            return {...state, idLoading: action.payload}

        case PASSPORT_LOADING:
            return {...state, passportLoading: action.payload}

        case ATTENDANCE_LOADING:
            return {...state, attendanceLoading: action.payload}
        
        case PROFILE_LOADING:
            return {...state, profileLoading: action.payload}

        case USER_DATA_LOADING:
            return {...state, userDataLoading: action.payload}

        case PAYMENT_LOADING:
            return {...state, paymentLoading: action.payload}

        case TRANSFER_LOADING:
            return {...state, transferLoading: action.payload}

        case QUERY_LOADING:
            return {...state, queryLoading: action.payload}

        default: return state
    }
}
