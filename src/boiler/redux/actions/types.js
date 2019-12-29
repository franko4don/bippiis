
import RNFS from 'react-native-fs';

// declare all constants related to boiler app
export const LOGIN_UPDATE = 'LOGIN_UPDATE';
export const LOGOUT_USER = 'LOGOUT_USER';

export const TOGGLESHOWIMAGEMODAL = 'TOGGLESHOWIMAGEMODAL';
export const TOGGLEIMAGEVIEWMODAL = 'TOGGLEIMAGEVIEWMODAL';
export const TOGGLESUCCESSMODAL = 'TOGGLESUCCESSMODAL';
export const TOGGLEERRORMODAL = 'TOGGLEERRORMODAL';
export const TOGGLEPENCOMMODAL = 'TOGGLEPENCOMMODAL';

export const CAPTURE_UPDATE = 'CAPTURE_UPDATE';

//profile
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const GET_USER = 'GET_USER';
export const LOGIN_USER = 'LOGIN_USER';

//loader
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const INSURANCE_LOADING = 'INSURANCE_LOADING';
export const TRANSFER_LOADING = 'TRANSFER_LOADING';
export const ID_LOADING = 'ID_LOADING';
export const PASSPORT_LOADING = 'PASSPORT_LOADING';
export const ATTENDANCE_LOADING = 'ATTENDANCE_LOADING';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const USER_DATA_LOADING = 'USER_DATA_LOADING';
export const QUERY_LOADING = 'QUERY_LOADING';

//transfers
export const GET_TRANSFER = 'GET_TRANSFER';
export const GET_SINGLE_TRANSFER = 'GET_SINGLE_TRANSFER';

//queries
export const GET_QUERY = 'GET_QUERY';
export const GET_SINGLE_QUERY = 'GET_SINGLE_QUERY';

//errors
export const GET_ERROR_MESSAGE = 'GET_ERROR_MESSAGE';
export const GET_ERRORS = 'GET_ERRORS';

//payments
export const PAYMENT_LOADING = 'PAYMENT_LOADING';
export const GET_PAYMENT = 'GET_PAYMENT';

//constants
export const FINGER_PRINT_PATH = RNFS.ExternalStorageDirectoryPath+'/Greenbit';