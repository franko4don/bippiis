import { LOGIN_UPDATE } from './types'
import client from './../../rclient/client';
import config from './../config';

export const loginUpdate = (payload) => {

    return {
        type: LOGIN_UPDATE,
        payload
    }
};

export const boilerAuthenticate = () => {
    
    return (dispatch) => {

        client.get(config.apiUrl)
            .then(res => {
                console.log(res, 'Response');
            })
            .catch(err => {
                
                console.log(err.response, 'Response error');
            })
      
    }
};
