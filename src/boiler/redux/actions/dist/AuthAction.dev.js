"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boilerAuthenticate = exports.logoutUser = exports.getUserData = exports.createPassword = exports.loginUser = exports.authenticateUser = exports.loginUpdate = void 0;

var _types = require("./types");

var _client = _interopRequireDefault(require("./../../rclient/client"));

var _config = _interopRequireDefault(require("./../config"));

var _axios = _interopRequireDefault(require("axios"));

var _reactNativeRouterFlux = require("react-native-router-flux");

var _ModalAction = require("./ModalAction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginUpdate = function loginUpdate(payload) {
  return {
    type: _types.LOGIN_UPDATE,
    payload: payload
  };
};

exports.loginUpdate = loginUpdate;

var authenticateUser = function authenticateUser(data) {
  return function (dispatch) {
    dispatch({
      type: _types.LOGIN_LOADING,
      payload: true
    });
    dispatch({
      type: _types.GET_ERRORS,
      payload: {}
    });

    _client["default"].post('auth', data).then(function (res) {
      console.log(res);
      dispatch({
        type: _types.LOGIN_LOADING,
        payload: false
      });
      var detail = res.data.data;

      if (detail.verification_type == 0) {
        if (detail.has_password) {
          _reactNativeRouterFlux.Actions.loginWithPassword();
        } else {
          _reactNativeRouterFlux.Actions.createPassword();
        }
      } else {
        _reactNativeRouterFlux.Actions.loginWithBiometrics();
      }

      console.log(res, 'Response');
    })["catch"](function (err) {
      dispatch({
        type: _types.LOGIN_LOADING,
        payload: false
      });

      if (err.response.status == 422) {
        dispatch({
          type: _types.GET_ERRORS,
          payload: err.response.data.errors
        });
      }

      if (err.response.status == 409 || err.response.status == 404 || err.response.status == 401) {
        dispatch((0, _ModalAction.toggleErrorModal)(true));
        dispatch({
          type: _types.GET_ERROR_MESSAGE,
          payload: err.response.data.message
        });
      }

      console.log(err.response);
    });
  };
};

exports.authenticateUser = authenticateUser;

var loginUser = function loginUser(data) {
  return function (dispatch) {
    dispatch({
      type: _types.LOGIN_LOADING,
      payload: true
    });
    dispatch({
      type: _types.GET_ERRORS,
      payload: {}
    });

    _client["default"].post('loginUserWithFingerPrint', data).then(function (res) {
      dispatch({
        type: _types.LOGIN_LOADING,
        payload: false
      });
      dispatch({
        type: _types.LOGIN_USER,
        payload: res.data
      });

      if (res.data.data.category == 1) {
        _reactNativeRouterFlux.Actions.reset('home');
      } else {
        _reactNativeRouterFlux.Actions.reset('pensionHome');
      }

      console.log(res, 'Response');
    })["catch"](function (err) {
      dispatch({
        type: _types.LOGIN_LOADING,
        payload: false
      });

      if (err.response.status == 409 || err.response.status == 404 || err.response.status == 401) {
        dispatch((0, _ModalAction.toggleErrorModal)(true));
        dispatch({
          type: _types.GET_ERROR_MESSAGE,
          payload: err.response.data.message
        });
      }

      if (err.response.status == 422) {
        dispatch({
          type: _types.GET_ERRORS,
          payload: err.response.data.errors
        });
      }

      console.log(err.response, 'Response error');
    });
  };
};

exports.loginUser = loginUser;

var createPassword = function createPassword(data) {
  return function (dispatch) {
    dispatch({
      type: _types.LOGIN_LOADING,
      payload: true
    });
    dispatch({
      type: _types.GET_ERRORS,
      payload: {}
    });

    _client["default"].post('createPassword', data).then(function (res) {
      dispatch({
        type: _types.LOGIN_LOADING,
        payload: false
      });
      dispatch({
        type: _types.LOGIN_USER,
        payload: res.data
      });

      if (res.data.data.category == 1) {
        _reactNativeRouterFlux.Actions.reset('home');
      } else {
        _reactNativeRouterFlux.Actions.reset('pensionHome');
      }

      console.log(res, 'Response');
    })["catch"](function (err) {
      dispatch({
        type: _types.LOGIN_LOADING,
        payload: false
      });

      if (err.response.status == 422) {
        dispatch({
          type: _types.GET_ERRORS,
          payload: err.response.data.errors
        });
      }

      console.log(err.response, 'Response error');
    });
  };
};

exports.createPassword = createPassword;

var getUserData = function getUserData() {
  return function (dispatch) {
    dispatch({
      type: _types.USER_DATA_LOADING,
      payload: true
    });

    _client["default"].get('user').then(function (res) {
      dispatch({
        type: _types.GET_USER,
        payload: res.data.data
      });
      dispatch({
        type: _types.USER_DATA_LOADING,
        payload: false
      });
      console.log(res, 'Response');
    })["catch"](function (err) {
      dispatch({
        type: _types.USER_DATA_LOADING,
        payload: false
      });
      console.log(err.response, 'Response error');
    });
  };
};

exports.getUserData = getUserData;

var logoutUser = function logoutUser() {
  return function (dispatch) {
    dispatch({
      type: _types.LOGOUT_USER
    });

    _reactNativeRouterFlux.Actions.reset('login');
  };
};

exports.logoutUser = logoutUser;

var boilerAuthenticate = function boilerAuthenticate() {
  return function (dispatch) {
    _client["default"].get(_config["default"].apiUrl).then(function (res) {
      console.log(res, 'Response');
    })["catch"](function (err) {
      console.log(err.response, 'Response error');
    });
  };
};

exports.boilerAuthenticate = boilerAuthenticate;