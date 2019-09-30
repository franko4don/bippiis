
const platform = 'local';

let settings = {};

switch(platform){
    case 'local':
        settings = {
            apiUrl: 'https://omg.ng/',
            TWITTER_COMSUMER_KEY: "WsZWvbQZf2KDVlE6vxg8TiFgG",
            TWITTER_CONSUMER_SECRET: "7RZg57j073f2JqU6xoO8NJ6HEnHOOF7EovKbfjdkm7zvfAA3Fe",
            baseUrl: '',
            app_name: '',
            subject: '',
            appUrl: '',
            gcmId: '124566883752'
        }
        break;

    case 'staging':
        settings = {
            apiUrl: 'https://something.com/',
            TWITTER_COMSUMER_KEY: "WsZWvbQZf2KDVlE6vxg8TiFgG",
            TWITTER_CONSUMER_SECRET: "7RZg57j073f2JqU6xoO8NJ6HEnHOOF7EovKbfjdkm7zvfAA3Fe",
            baseUrl: '',
            app_name: '',
            subject: '',
            appUrl: '',
            gcmId: '124566883752'
        }
        break;
    
    case 'production':
        settings = {
            apiUrl: 'https://something.com/',
            TWITTER_COMSUMER_KEY: "WsZWvbQZf2KDVlE6vxg8TiFgG",
            TWITTER_CONSUMER_SECRET: "7RZg57j073f2JqU6xoO8NJ6HEnHOOF7EovKbfjdkm7zvfAA3Fe",
            baseUrl: '',
            app_name: '',
            subject: '',
            appUrl: '',
            gcmId: '124566883752'
        }
        break;
}

export default settings;