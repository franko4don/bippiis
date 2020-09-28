"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _types = require("./../actions/types");

var _client = _interopRequireDefault(require("./../../rclient/client"));

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = {
  password: '',
  password_confirmation: '',
  bippiis_number: '',
  user: {},
  auth: false,
  token: '',
  firebaseToken: ''
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.LOGIN_UPDATE:
      return _objectSpread({}, state, _defineProperty({}, action.payload.prop, action.payload.value));

    case _types.LOGIN_USER:
      storeUserData(action.payload);
      return _objectSpread({}, state, {
        auth: true,
        token: action.payload.token,
        user: action.payload.data,
        bippiis_number: '',
        password: ''
      });

    case _types.LOGOUT_USER:
      return _objectSpread({}, state, {
        bippiis_number: '',
        password: '',
        password_confirmation: '',
        user: {}
      });

    case _types.GET_USER:
      return _objectSpread({}, state, {
        user: action.payload
      });

    default:
      return state;
  }
};

exports["default"] = _default;

var storeUserData = function storeUserData(payload) {
  _asyncStorage["default"].setItem('token', payload.token);

  activateAxios(payload);
};

var activateAxios = function activateAxios(payload) {
  _client["default"].defaults.headers.common['Authorization'] = 'Bearer ' + payload.token;
};

var deleteUserData = function deleteUserData() {
  delete _client["default"].defaults.headers.common['Authorization'];
};