"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var platform = 'production';
var settings = {};

switch (platform) {
  case 'local':
    settings = {
      apiUrl: 'http://192.168.1.130/api/v1/',
      TWITTER_COMSUMER_KEY: "WsZWvbQZf2KDVlE6vxg8TiFgG",
      TWITTER_CONSUMER_SECRET: "7RZg57j073f2JqU6xoO8NJ6HEnHOOF7EovKbfjdkm7zvfAA3Fe",
      baseUrl: '',
      app_name: '',
      subject: '',
      appUrl: '',
      author: 'KIOSK',
      gcmId: '124566883752'
    };
    break;

  case 'staging':
    settings = {
      apiUrl: 'https://bippiis.com/api/v1/',
      TWITTER_COMSUMER_KEY: "WsZWvbQZf2KDVlE6vxg8TiFgG",
      TWITTER_CONSUMER_SECRET: "7RZg57j073f2JqU6xoO8NJ6HEnHOOF7EovKbfjdkm7zvfAA3Fe",
      baseUrl: '',
      app_name: '',
      subject: '',
      appUrl: '',
      author: 'KIOSK',
      gcmId: '124566883752'
    };
    break;

  case 'production':
    settings = {
      apiUrl: 'https://bippiis.com/api/v1/',
      TWITTER_COMSUMER_KEY: "WsZWvbQZf2KDVlE6vxg8TiFgG",
      TWITTER_CONSUMER_SECRET: "7RZg57j073f2JqU6xoO8NJ6HEnHOOF7EovKbfjdkm7zvfAA3Fe",
      baseUrl: '',
      app_name: '',
      subject: '',
      appUrl: '',
      author: 'KIOSK',
      gcmId: '124566883752'
    };
    break;
}

var _default = settings;
exports["default"] = _default;