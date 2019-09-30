import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ModalReducer from './ModalReducer';
import CaptureReducer from './CaptureReducer';
import ProfileReducer from './ProfileReducer';

export default combineReducers({
    auth: AuthReducer,
    modal: ModalReducer,
    capture: CaptureReducer,
    profile: ProfileReducer
});