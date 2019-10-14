import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ModalReducer from './ModalReducer';
import CaptureReducer from './CaptureReducer';
import ProfileReducer from './ProfileReducer';
import LoadingReducer from './LoadingReducer';
import ErrorReducer from './ErrorReducer';

export default combineReducers({
    auth: AuthReducer,
    modal: ModalReducer,
    capture: CaptureReducer,
    profile: ProfileReducer,
    loader: LoadingReducer,
    error: ErrorReducer
});