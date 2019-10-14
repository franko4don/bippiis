
import {LOGIN_LOADING, INSURANCE_LOADING, ID_LOADING, PASSPORT_LOADING, ATTENDANCE_LOADING, PROFILE_LOADING} from './../actions/types'


const INITIAL_STATE = {
    loginLoading: false,
    insuranceLoading: false,
    idLoading: false,
    passportLoading: false,
    attendanceLoading: false,
    profileLoading: false
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
            
        default: return state
    }
}
