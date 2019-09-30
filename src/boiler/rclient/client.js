import axios from 'axios';
import settings from './../redux/config';

let config = {baseURL: settings.apiUrl,
  timeout: 60000,
  headers: {
    
  }
};
let instance = axios.create(config);

export default instance;