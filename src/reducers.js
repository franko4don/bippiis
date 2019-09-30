import {combineReducers } from 'redux'
import BoilerServiceReducer from './boiler/redux/reducers/index';

export default combineReducers({
    boilerService: BoilerServiceReducer
});